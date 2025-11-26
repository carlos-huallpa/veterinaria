from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from turnos.models import Turno
from turnos.serializers import TurnoSerializer
from django.db.models import Count, F

@api_view(['GET'])
def dashboard_view(request):
    hoy = date.today()

    proximos = Turno.objects.filter(fecha__gte=hoy).order_by('fecha', 'hora')[:5]
    turnos_hoy = Turno.objects.filter(fecha=hoy).order_by('hora')
    ultimos = Turno.objects.filter(fecha__lt=hoy).order_by('-fecha', '-hora')[:5]

    mes_actual = Turno.objects.filter(fecha__year=hoy.year, fecha__month=hoy.month).count()

    mes_anterior_year = hoy.year if hoy.month != 1 else hoy.year - 1
    mes_anterior_month = hoy.month - 1 if hoy.month != 1 else 12

    mes_anterior = Turno.objects.filter(
        fecha__year=mes_anterior_year,
        fecha__month=mes_anterior_month
    ).count()

    if mes_anterior == 0:
        mes_ratio_dif = None    
    else:
        mes_ratio_dif = (mes_actual - mes_anterior) / mes_anterior
   
    #Turnos del mes por médico
    top_medico_mes = (
        Turno.objects
        .filter(fecha__year=hoy.year, fecha__month=hoy.month)
        .values(
            nombre=F("medico__nombre"),
            apellido=F("medico__apellido"),
        )    
        .annotate(total=Count("id"))
        .order_by("-total")
        .first()
    )

    # Turnos a lo largo de 6 meses
    estadistica_6 = []
    for i in range(6):
        mes = hoy.month - i
        año = hoy.year
        if mes <= 0:
            mes += 12
            año -= 1

        cantidad = Turno.objects.filter(
            fecha__year=año,
            fecha__month=mes
        ).count()

        estadistica_6.append({"mes": f"{año}-{mes:02d}", "cantidad": cantidad})

    estadistica_6.reverse()

    return Response({
        "proximos_turnos": TurnoSerializer(proximos, many=True).data,
        "turnos_hoy": TurnoSerializer(turnos_hoy, many=True).data,
        "ultimos_turnos": TurnoSerializer(ultimos, many=True).data,
        "mes_actual": mes_actual,
        "mes_anterior": mes_anterior,
        "estadistica_6_meses": estadistica_6,
        "mes_ratio": mes_ratio_dif,
        "top_medico": top_medico_mes,
    })
