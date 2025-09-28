# backend/turnos/admin.py
from django.contrib import admin
from .models import Turno

@admin.register(Turno)
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora', 'mascota', 'medico', 'motivo')
    list_filter = ('fecha', 'medico')
    search_fields = ('mascota__nombre', 'medico__apellido', 'motivo')
