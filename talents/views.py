from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.utils.translation import gettext as _
from django.conf import settings
from django.utils import translation
from django.utils import timezone
from .models import TalentProfile, TalentPhoto, TalentVideo, ProfileUpdateHistory
from .forms import TalentProfileForm, TalentPhotoForm, TalentVideoForm
from django.contrib.auth.models import User

def home(request):
    """Homepage view"""
    featured_talents = TalentProfile.objects.filter(status='approved', is_publicly_visible=True)[:6]
    context = {
        'featured_talents': featured_talents,
    }
    return render(request, 'talents/home.html', context)

def talent_showcase(request):
    """Public talent showcase - only shows approved profiles"""
    # Get all approved profiles that are publicly visible
    talents = TalentProfile.objects.filter(
        status='approved',
        is_publicly_visible=True
    ).order_by('-created_at')
    
    # Search functionality
    search_term = request.GET.get('search', '')
    if search_term:
        talents = talents.filter(
            Q(public_id__icontains=search_term) |
            Q(bio__icontains=search_term) |
            Q(city__icontains=search_term) |
            Q(group_name__icontains=search_term)
        )
    
    # Role filter
    role_filter = request.GET.get('role', 'all')
    if role_filter != 'all':
        talents = talents.filter(role=role_filter)
    
    # Registration type filter
    registration_type_filter = request.GET.get('registration_type', 'all')
    if registration_type_filter != 'all':
        talents = talents.filter(registration_type=registration_type_filter)
    
    # Gender filter
    gender_filter = request.GET.get('gender', 'all')
    if gender_filter != 'all':
        talents = talents.filter(gender_identification=gender_filter)
    
    # Location filter
    location_filter = request.GET.get('location', 'all')
    if location_filter != 'all':
        talents = talents.filter(city__icontains=location_filter)
    
    # Get unique locations and roles for filters
    unique_locations = TalentProfile.objects.filter(
        status='approved',
        is_publicly_visible=True
    ).values_list('city', flat=True).distinct()
    
    talent_roles = TalentProfile.TALENT_ROLES
    registration_types = TalentProfile.REGISTRATION_TYPE_CHOICES
    gender_choices = TalentProfile.GENDER_CHOICES
    
    context = {
        'talents': talents,
        'search_term': search_term,
        'role_filter': role_filter,
        'registration_type_filter': registration_type_filter,
        'gender_filter': gender_filter,
        'location_filter': location_filter,
        'unique_locations': unique_locations,
        'talent_roles': talent_roles,
        'registration_types': registration_types,
        'gender_choices': gender_choices,
    }
    return render(request, 'talents/showcase.html', context)

def talent_detail(request, pk):
    """Individual talent profile view - only shows approved profiles"""
    try:
        talent = TalentProfile.objects.get(pk=pk)
        
        # Check if talent is approved and publicly visible
        if talent.status != 'approved' or not talent.is_publicly_visible:
            # For staff members, show the profile anyway
            if request.user.is_staff:
                photos = talent.photos.filter(is_approved=True)
                videos = talent.videos.filter(is_approved=True)
                
                personality_tags = [
                    "PROFESSIONAL", "CREATIVE", "PASSIONATE",
                    "RELIABLE", "ENERGETIC", "VERSATILE",
                    "COLLABORATIVE", "DEDICATED", "INNOVATIVE",
                    "EXPERIENCED", "ADAPTABLE", "SKILLED"
                ]
                
                context = {
                    'talent': talent,
                    'photos': photos,
                    'videos': videos,
                    'personality_tags': personality_tags,
                    'is_staff_view': True,
                }
                return render(request, 'talents/profile.html', context)
            else:
                # For regular users, show 404
                raise TalentProfile.DoesNotExist
        else:
            photos = talent.photos.filter(is_approved=True)
            videos = talent.videos.filter(is_approved=True)
            
            # Personality tags based on role and experience
            personality_tags = [
                "PROFESSIONAL", "CREATIVE", "PASSIONATE",
                "RELIABLE", "ENERGETIC", "VERSATILE",
                "COLLABORATIVE", "DEDICATED", "INNOVATIVE",
                "EXPERIENCED", "ADAPTABLE", "SKILLED"
            ]
            
            context = {
                'talent': talent,
                'photos': photos,
                'videos': videos,
                'personality_tags': personality_tags,
                'is_staff_view': False,
            }
            return render(request, 'talents/profile.html', context)
            
    except TalentProfile.DoesNotExist:
        return render(request, 'talents/404.html', status=404)

def about(request):
    """About page"""
    return render(request, 'talents/about.html')

@login_required
def dashboard(request):
    """Talent dashboard for profile management"""
    try:
        talent_profile = TalentProfile.objects.get(user=request.user)
    except TalentProfile.DoesNotExist:
        talent_profile = None
    
    if request.method == 'POST':
        form = TalentProfileForm(request.POST, request.FILES, instance=talent_profile)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            
            # If this is a new profile, set initial values
            if not talent_profile:
                profile.public_id = f"TT-{timezone.now().year}-{TalentProfile.objects.count():03d}"
                profile.status = 'pending'
                profile.is_publicly_visible = False
                profile.email_private = request.user.email
            else:
                # If updating an existing profile, set back to pending for re-approval
                if talent_profile.status == 'approved':
                    profile.status = 'pending'
                    # Keep the profile publicly visible until the update is approved
                    profile.is_publicly_visible = talent_profile.is_publicly_visible
                    # Record the update for moderation
                    ProfileUpdateHistory.objects.create(
                        talent=profile,
                        updated_by=request.user,
                        previous_status='approved',
                        new_status='pending',
                        changes_summary="Profile update submitted for review"
                    )
                else:
                    # Profile was already pending or rejected
                    ProfileUpdateHistory.objects.create(
                        talent=profile,
                        updated_by=request.user,
                        previous_status=talent_profile.status,
                        new_status='pending',
                        changes_summary="Profile updated and resubmitted for review"
                    )
            
            profile.save()
            
            # Show success message based on whether profile was submitted for review
            if not talent_profile:
                messages.success(request, 'Profile submitted successfully! Your profile will be reviewed by our moderators within 2-3 business days.')
            elif talent_profile.status == 'approved':
                messages.success(request, 'Profile updated successfully! Your changes will be reviewed by our moderators before going live.')
            else:
                messages.success(request, 'Profile updated successfully!')
            
            return redirect('dashboard')
    else:
        form = TalentProfileForm(instance=talent_profile)
    
    context = {
        'talent_profile': talent_profile,
        'form': form,
    }
    return render(request, 'talents/dashboard.html', context)

@staff_member_required
def moderator_dashboard(request):
    """Moderator dashboard for reviewing applications"""
    talents = TalentProfile.objects.all().order_by('-created_at')
    
    # Search functionality
    search_term = request.GET.get('search', '')
    if search_term:
        talents = talents.filter(
            Q(public_id__icontains=search_term) |
            Q(user__first_name__icontains=search_term) |
            Q(user__last_name__icontains=search_term) |
            Q(user__email__icontains=search_term) |
            Q(group_name__icontains=search_term) |
            Q(city__icontains=search_term)
        )
    
    # Status filter
    status_filter = request.GET.get('status', 'all')
    if status_filter != 'all':
        talents = talents.filter(status=status_filter)
    
    # Registration type filter
    registration_type_filter = request.GET.get('registration_type', 'all')
    if registration_type_filter != 'all':
        talents = talents.filter(registration_type=registration_type_filter)
    
    # Gender filter
    gender_filter = request.GET.get('gender', 'all')
    if gender_filter != 'all':
        talents = talents.filter(gender_identification=gender_filter)
    
    # Role filter
    role_filter = request.GET.get('role', 'all')
    if role_filter != 'all':
        talents = talents.filter(role=role_filter)
    
    # Handle approve/reject actions
    if request.method == 'POST':
        talent_id = request.POST.get('talent_id')
        action = request.POST.get('action')
        
        if talent_id and action:
            talent = get_object_or_404(TalentProfile, pk=talent_id)
            
            if action == 'approve':
                talent.status = 'approved'
                talent.is_publicly_visible = True
                talent.last_approved_at = timezone.now()
                talent.approved_by = request.user
                talent.save()
                
                # Record the approval in update history
                ProfileUpdateHistory.objects.create(
                    talent=talent,
                    updated_by=request.user,
                    previous_status='pending',
                    new_status='approved',
                    changes_summary="Profile approved and made publicly visible"
                )
                
                messages.success(request, f'Profile {talent.public_id} has been approved and is now publicly visible.')
            
            elif action == 'reject':
                # Check if this was an update to an approved profile
                update_history = ProfileUpdateHistory.objects.filter(
                    talent=talent,
                    previous_status='approved',
                    new_status='pending_review'
                ).order_by('-updated_at').first()
                
                if update_history:
                    # This was an update to an approved profile - revert changes
                    talent.status = 'approved'
                    talent.is_publicly_visible = True
                    talent.save()
                    
                    # Record the rejection in update history
                    ProfileUpdateHistory.objects.create(
                        talent=talent,
                        updated_by=request.user,
                        previous_status='pending_review',
                        new_status='approved',
                        changes_summary="Profile update rejected - reverted to previous version"
                    )
                    
                    messages.success(request, f'Profile update for {talent.public_id} has been rejected. The previous version remains visible.')
                else:
                    # This was a new profile - reject and hide
                    talent.status = 'rejected'
                    talent.is_publicly_visible = False
                    talent.save()
                    
                    # Record the rejection in update history
                    ProfileUpdateHistory.objects.create(
                        talent=talent,
                        updated_by=request.user,
                        previous_status='pending',
                        new_status='rejected',
                        changes_summary="Profile rejected"
                    )
                    
                    messages.success(request, f'Profile {talent.public_id} has been rejected.')
    
    # Calculate stats
    stats = {
        'total': TalentProfile.objects.count(),
        'pending': TalentProfile.objects.filter(status='pending').count(),
        'approved': TalentProfile.objects.filter(status='approved').count(),
        'rejected': TalentProfile.objects.filter(status='rejected').count(),
        'public': TalentProfile.objects.filter(is_publicly_visible=True).count(),
    }
    
    # Get filter choices
    registration_types = TalentProfile.REGISTRATION_TYPE_CHOICES
    gender_choices = TalentProfile.GENDER_CHOICES
    talent_roles = TalentProfile.TALENT_ROLES
    
    context = {
        'talents': talents,
        'search_term': search_term,
        'status_filter': status_filter,
        'registration_type_filter': registration_type_filter,
        'gender_filter': gender_filter,
        'role_filter': role_filter,
        'stats': stats,
        'registration_types': registration_types,
        'gender_choices': gender_choices,
        'talent_roles': talent_roles,
    }
    return render(request, 'talents/moderator_dashboard.html', context)

def register(request):
    """User registration with support for personal and group registrations"""
    try:
        if request.method == 'POST':
            # Extract form data
            registration_type = request.POST.get('registration_type', 'personal')
            email = request.POST.get('email')
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            
            # Validate passwords match
            if password1 != password2:
                messages.error(request, 'Passwords do not match.')
                return render(request, 'registration/register.html', {'form_data': request.POST})
            
            # Check if user already exists
            if User.objects.filter(email=email).exists():
                messages.error(request, 'A user with this email already exists.')
                return render(request, 'registration/register.html', {'form_data': request.POST})
            
            # Validate registration type specific fields
            if registration_type == 'personal':
                first_name = request.POST.get('first_name')
                last_name = request.POST.get('last_name')
                if not first_name or not last_name:
                    messages.error(request, 'First name and last name are required for personal registration.')
                    return render(request, 'registration/register.html', {'form_data': request.POST})
            else:  # group
                group_name = request.POST.get('group_name')
                if not group_name:
                    messages.error(request, 'Group name is required for group registration.')
                    return render(request, 'registration/register.html', {'form_data': request.POST})
                first_name = group_name
                last_name = "Group"
            
            # Create user
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password1,
                first_name=first_name,
                last_name=last_name
            )
            
            # Create talent profile with registration type
            talent_profile = TalentProfile.objects.create(
                user=user,
                registration_type=registration_type,
                group_name=group_name if registration_type == 'group' else None,
                email_private=email
            )
            
            # Log user in
            login(request, user)
            
            success_message = 'Account created successfully! Please complete your profile.'
            if registration_type == 'group':
                success_message = 'Group account created successfully! Please complete your group profile.'
            
            messages.success(request, success_message)
            return redirect('dashboard')
        
        context = {}
        return render(request, 'registration/register.html', context)
    except Exception as e:
        # Log the error for debugging
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error in register view: {str(e)}")
        
        # Return a simple error response
        messages.error(request, 'An error occurred during registration. Please try again.')
        return render(request, 'registration/register.html', {})

def set_language(request):
    """Language switcher view"""
    if request.method == 'POST':
        language = request.POST.get('language')
        if language in [lang[0] for lang in settings.LANGUAGES]:
            # Activate the language for this request
            translation.activate(language)
            # Store the language preference in session
            request.session['django_language'] = language
            # Also set the language cookie for better persistence
            response = HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
            response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language)
            return response
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))