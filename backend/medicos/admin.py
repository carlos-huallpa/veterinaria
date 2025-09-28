# backend/medicos/admin.py
from django.contrib import admin
from .models import Medico

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'matricula', 'especialidad', 'email')
    search_fields = ('nombre', 'apellido', 'matricula', 'especialidad')

