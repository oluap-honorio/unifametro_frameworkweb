from django import forms
from .models import Ovino


class OvinoForm(forms.ModelForm):

	class Meta:
		model = Ovino

		fields = [
			"identificador",
            "peso",
            "nascimento",
            "raca",
            "cor",
            "genero",
		]
