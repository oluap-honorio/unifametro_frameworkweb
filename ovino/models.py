from django.db import models

class Ovino(models.Model):
    
    identificador = models.CharField(max_length=16, unique=True)
    peso = models.FloatField()
    nascimento = models.DateTimeField()
    raca = models.CharField(max_length=20, null=True)
    cor = models.CharField(max_length=20,blank=True, null=True)
    genero = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.deveui
