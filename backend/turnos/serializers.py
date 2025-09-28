# backend/turnos/serializers.py
from rest_framework import serializers
from .models import Turno

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'

    def validate(self, data):
        """
        Validar que no haya un turno duplicado para el mismo médico
        en la misma fecha y hora.
        """
        medico = data.get('medico')
        fecha = data.get('fecha')
        hora = data.get('hora')

        if Turno.objects.filter(medico=medico, fecha=fecha, hora=hora).exists():
            raise serializers.ValidationError("Este médico ya tiene un turno en esta fecha y hora.")
        return data
