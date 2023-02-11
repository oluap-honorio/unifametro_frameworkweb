from django.db import models

# Create your models here.

class Ovino(models.Model):
    identificador = models.CharField(max_length=16, unique=True)
    peso = models.FloatField()
    nascimento = models.DateField()
    raca = models.CharField(max_length=20, null=True)
    cor = models.CharField(max_length=20, null=True, blank=True)
    genero = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.identificador
