"""
URL configuration for tale_of_talents project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('talents.urls')),
]

# Static and media files handling
if settings.DEBUG:
    # Development: Django serves static and media files
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Also serve from STATICFILES_DIRS
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'static')
else:
    # Production: Serve media files through static URLs
    urlpatterns += [
        path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
    ]