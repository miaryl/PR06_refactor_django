from django.urls import path
from . import views

urlpatterns = [
    path('', views.indentity_map_view, name='identity_map')
]