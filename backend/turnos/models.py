# backend/turnos/models.py
from django.db import models
from mascotas.models import Mascota
from medicos.models import Medico

class Turno(models.Model):
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name="turnos")
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name="turnos")
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.CharField(max_length=200)

    class Meta:
        unique_together = ('medico', 'fecha', 'hora')  # evita turnos duplicados

    def __str__(self):
        return f"Turno {self.fecha} {self.hora} - {self.mascota} con {self.medico}"
