from django import forms
from .models import TalentProfile, TalentPhoto, TalentVideo

class TalentProfileForm(forms.ModelForm):
    class Meta:
        model = TalentProfile
        fields = [
            'phone', 'city', 'role', 'bio', 'experience',
            'profile_image', 'cv_file',
            'height', 'gender_identification', 'pronouns',
            'hair_color', 'eye_color', 'agency', 'union_affiliations',
            'availability'
        ]
        widgets = {
            'phone': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Enter your phone number'
            }),
            'city': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Enter your city'
            }),
            'role': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }),
            'bio': forms.Textarea(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'rows': 4,
                'placeholder': 'Tell us about your experience, skills, and what makes you unique...'
            }),
            'experience': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }, choices=[
                ('', 'Select experience level'),
                ('1-2 years', '1-2 years'),
                ('3-5 years', '3-5 years'),
                ('6-10 years', '6-10 years'),
                ('10+ years', '10+ years'),
            ]),
            'profile_image': forms.FileInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }),
            'cv_file': forms.FileInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }),
            'height': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., 5ft 7in'
            }),
            'gender_identification': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., Female'
            }),
            'pronouns': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., She/Her'
            }),
            'hair_color': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., Brown'
            }),
            'eye_color': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., Brown'
            }),
            'agency': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., Elite Talent Agency'
            }),
            'union_affiliations': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., AGMA, IATSE'
            }),
            'availability': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., Available for tours'
            }),
        }

class TalentPhotoForm(forms.ModelForm):
    class Meta:
        model = TalentPhoto
        fields = ['image', 'caption']
        widgets = {
            'image': forms.FileInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'accept': 'image/*'
            }),
            'caption': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Add a caption for this photo...'
            }),
        }

class TalentVideoForm(forms.ModelForm):
    class Meta:
        model = TalentVideo
        fields = ['title', 'platform', 'video_url', 'duration']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Enter video title'
            }),
            'platform': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }),
            'video_url': forms.URLInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'Enter YouTube or Vimeo URL'
            }),
            'duration': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder': 'e.g., 3:45'
            }),
        }
    
    def clean_video_url(self):
        url = self.cleaned_data.get('video_url')
        if url:
            if 'youtube.com' not in url and 'youtu.be' not in url and 'vimeo.com' not in url:
                raise forms.ValidationError('Only YouTube and Vimeo URLs are allowed.')
        return url