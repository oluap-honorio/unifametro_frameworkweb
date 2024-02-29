from django.contrib import admin
from .models import *
from import_export.admin import ExportActionMixin


class OvinoAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ('identificador', 'peso', 'nascimento', 'raca', 'cor', 'genero','created_at','updated_at')

admin.site.register(Ovino, OvinoAdmin)