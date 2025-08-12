from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('talents/', views.talent_showcase, name='talent_showcase'),
    path('talent/<int:pk>/', views.talent_detail, name='talent_detail'),
    path('about/', views.about, name='about'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('moderator/', views.moderator_dashboard, name='moderator_dashboard'),
    path('auth/register/', views.register, name='register'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('set-language/', views.set_language, name='set_language'),
]