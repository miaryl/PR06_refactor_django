from django.shortcuts import render
from django.urls import reverse

# Create your views here.

def indentity_map_view(request):
    context = {
        'url_enviar': '',
        'url_guardar_informe': '',
        'url_lista' : '#'
    }
    return render(request, 'IdentityMap.html', context)
