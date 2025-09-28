# backend/mascotas/serializers.py
from rest_framework import serializers
from .models import Mascota

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = '__all__'  # todos los campos, incluyendo cliente
