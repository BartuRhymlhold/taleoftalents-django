from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import TalentProfile, TalentPhoto, TalentVideo, ProfileUpdateHistory

@admin.register(TalentProfile)
class TalentProfileAdmin(admin.ModelAdmin):
    list_display = ['public_id', 'registration_type', 'display_name', 'role', 'city', 'status', 'is_publicly_visible', 'created_at', 'last_approved_at']
    list_filter = ['status', 'registration_type', 'role', 'city', 'is_publicly_visible', 'created_at']
    search_fields = ['public_id', 'user__first_name', 'user__last_name', 'user__email', 'group_name', 'city']
    readonly_fields = ['public_id', 'created_at', 'updated_at', 'last_approved_at', 'approved_by']
    
    fieldsets = (
        ('Registration Information', {
            'fields': ('registration_type', 'group_name', 'user')
        }),
        ('Public Information', {
            'fields': ('public_id', 'role', 'city', 'bio', 'experience', 'profile_image', 'cv_file')
        }),
        ('Private Information (Admin Only)', {
            'fields': ('phone', 'email_private'),
            'classes': ('collapse',)
        }),
        ('Approval Status', {
            'fields': ('status', 'is_publicly_visible', 'last_approved_at', 'approved_by')
        }),
        ('Additional Details', {
            'fields': ('height', 'gender_identification', 'pronouns', 'hair_color', 'eye_color', 'agency', 'union_affiliations', 'availability'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    actions = ['approve_profiles', 'reject_profiles', 'make_public', 'make_private']
    
    def display_name(self, obj):
        if obj.registration_type == 'group':
            return obj.group_name or f"Group {obj.public_id}"
        else:
            return f"{obj.user.first_name} {obj.user.last_name}".strip()
    display_name.short_description = 'Display Name'
    
    def approve_profiles(self, request, queryset):
        from django.utils import timezone
        updated = queryset.update(
            status='approved',
            is_publicly_visible=True,
            last_approved_at=timezone.now(),
            approved_by=request.user
        )
        self.message_user(request, f'{updated} profiles have been approved.')
    approve_profiles.short_description = "Approve selected profiles"
    
    def reject_profiles(self, request, queryset):
        updated = queryset.update(status='rejected', is_publicly_visible=False)
        self.message_user(request, f'{updated} profiles have been rejected.')
    reject_profiles.short_description = "Reject selected profiles"
    
    def make_public(self, request, queryset):
        updated = queryset.update(is_publicly_visible=True)
        self.message_user(request, f'{updated} profiles are now publicly visible.')
    make_public.short_description = "Make selected profiles public"
    
    def make_private(self, request, queryset):
        updated = queryset.update(is_publicly_visible=False)
        self.message_user(request, f'{updated} profiles are now private.')
    make_private.short_description = "Make selected profiles private"
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'approved_by')
    
    def get_readonly_fields(self, request, obj=None):
        if obj and obj.status == 'approved':
            return list(self.readonly_fields) + ['status']
        return self.readonly_fields

@admin.register(TalentPhoto)
class TalentPhotoAdmin(admin.ModelAdmin):
    list_display = ['talent', 'caption', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['talent__public_id', 'caption']
    actions = ['approve_photos', 'reject_photos']
    
    def approve_photos(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f'{updated} photos have been approved.')
    approve_photos.short_description = "Approve selected photos"
    
    def reject_photos(self, request, queryset):
        updated = queryset.update(is_approved=False)
        self.message_user(request, f'{updated} photos have been rejected.')
    reject_photos.short_description = "Reject selected photos"

@admin.register(TalentVideo)
class TalentVideoAdmin(admin.ModelAdmin):
    list_display = ['talent', 'title', 'platform', 'is_approved', 'created_at']
    list_filter = ['platform', 'is_approved', 'created_at']
    search_fields = ['talent__public_id', 'title']
    actions = ['approve_videos', 'reject_videos']
    
    def approve_videos(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f'{updated} videos have been approved.')
    approve_videos.short_description = "Approve selected videos"
    
    def reject_videos(self, request, queryset):
        updated = queryset.update(is_approved=False)
        self.message_user(request, f'{updated} videos have been rejected.')
    reject_videos.short_description = "Reject selected videos"

@admin.register(ProfileUpdateHistory)
class ProfileUpdateHistoryAdmin(admin.ModelAdmin):
    list_display = ['talent', 'updated_by', 'previous_status', 'new_status', 'updated_at']
    list_filter = ['previous_status', 'new_status', 'updated_at']
    search_fields = ['talent__public_id', 'updated_by__username']
    readonly_fields = ['talent', 'updated_by', 'updated_at', 'previous_status', 'new_status', 'changes_summary']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

# Custom admin site configuration
admin.site.site_header = "Tale of Talents - Admin"
admin.site.site_title = "Tale of Talents Admin"
admin.site.index_title = "Welcome to Tale of Talents Administration"