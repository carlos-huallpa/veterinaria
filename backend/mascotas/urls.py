# backend/mascotas/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MascotaViewSet

router = DefaultRouter()
router.register(r'', MascotaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
