from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
import uuid
from django.utils import timezone

class TalentProfile(models.Model):
    TALENT_ROLES = [
        ('dancer', 'Dancer'),
        ('acrobat', 'Acrobat'),
        ('performer', 'Performer'),
        ('musician', 'Musician'),
        ('entertainer', 'Entertainer'),
        ('bar_service', 'Bar & Service Staff'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('non_binary', 'Non-binary'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]
    
    # Registration type
    REGISTRATION_TYPE_CHOICES = [
        ('personal', 'Personal'),
        ('group', 'Group'),
    ]
    
    # Basic fields
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='talent_profile')
    public_id = models.CharField(max_length=20, unique=True, blank=True)
    registration_type = models.CharField(max_length=10, choices=REGISTRATION_TYPE_CHOICES, default='personal')
    group_name = models.CharField(max_length=100, blank=True, null=True, help_text="Group name (required for group registrations)")
    
    # Personal information (hidden from public)
    phone = models.CharField(max_length=20)
    email_private = models.EmailField(blank=True)
    
    # Public information
    city = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=TALENT_ROLES)
    experience = models.CharField(max_length=50)
    bio = models.TextField()
    
    # Media
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    cv_file = models.FileField(upload_to='cvs/', blank=True, null=True)
    
    # Additional details
    height = models.CharField(max_length=20, blank=True, null=True)
    gender_identification = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True, null=True)
    pronouns = models.CharField(max_length=20, blank=True, null=True)
    hair_color = models.CharField(max_length=20, blank=True, null=True)
    eye_color = models.CharField(max_length=20, blank=True, null=True)
    agency = models.CharField(max_length=100, blank=True, null=True)
    union_affiliations = models.CharField(max_length=200, blank=True, null=True)
    availability = models.CharField(max_length=200, blank=True, null=True)
    
    # Approval and visibility
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    is_publicly_visible = models.BooleanField(default=False)
    last_approved_at = models.DateTimeField(blank=True, null=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='approved_profiles')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.public_id:
            year = timezone.now().year
            count = TalentProfile.objects.count()
            self.public_id = f"TT-{year}-{count:03d}"
        super().save(*args, **kwargs)
    
    @property
    def display_name(self):
        if self.registration_type == 'group':
            return self.group_name or f"Group {self.public_id}"
        else:
            return f"{self.user.first_name} {self.user.last_name}".strip()
    
    @property
    def is_approved(self):
        return self.status == 'approved'
    
    @property
    def performance_style(self):
        styles = {
            'dancer': 'Contemporary, Latin, Jazz',
            'acrobat': 'Aerial, Hand Balancing',
            'performer': 'Theater, Musical',
            'musician': 'Jazz, Blues, Pop',
            'entertainer': 'Comedy, Interactive',
            'bar_service': 'Mixology, Fine Dining',
        }
        return styles.get(self.role, 'Various Styles')
    
    @property
    def specialties(self):
        specialties = {
            'dancer': 'Choreography, Partner Work',
            'acrobat': 'Silks, Trapeze, Contortion',
            'performer': 'Character Work, Improv',
            'musician': 'Multi-instrumental',
            'entertainer': 'Audience Interaction',
            'bar_service': 'Craft Cocktails, Wine',
        }
        return specialties.get(self.role, 'Multi-disciplinary')
    
    def __str__(self):
        return f"{self.display_name} ({self.public_id})"

class TalentPhoto(models.Model):
    talent = models.ForeignKey(TalentProfile, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='talent_photos/')
    caption = models.CharField(max_length=200, blank=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Photo for {self.talent.public_id}"

class TalentVideo(models.Model):
    VIDEO_PLATFORMS = [
        ('youtube', 'YouTube'),
        ('vimeo', 'Vimeo'),
    ]
    
    talent = models.ForeignKey(TalentProfile, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=100)
    platform = models.CharField(max_length=10, choices=VIDEO_PLATFORMS, default='youtube')
    video_url = models.URLField(help_text="YouTube or Vimeo URL only", blank=True, null=True)
    duration = models.CharField(max_length=10, blank=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.video_url:
            if 'youtube.com' not in self.video_url and 'youtu.be' not in self.video_url and 'vimeo.com' not in self.video_url:
                raise ValidationError('Only YouTube and Vimeo URLs are allowed.')
    
    def __str__(self):
        return f"{self.title} - {self.talent.public_id}"

class ProfileUpdateHistory(models.Model):
    talent = models.ForeignKey(TalentProfile, on_delete=models.CASCADE, related_name='update_history')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now_add=True)
    changes_summary = models.TextField()
    previous_status = models.CharField(max_length=10, choices=TalentProfile.STATUS_CHOICES)
    new_status = models.CharField(max_length=10, choices=TalentProfile.STATUS_CHOICES)
    
    def __str__(self):
        return f"{self.talent.public_id} - {self.updated_at.strftime('%Y-%m-%d %H:%M')}"