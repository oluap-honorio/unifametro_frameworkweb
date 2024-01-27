#from django.shortcuts import render

# Create your views here.

from django.shortcuts import (get_object_or_404,
                              render,
                              HttpResponseRedirect)
from .models import Ovino
from .forms import OvinoForm
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    context = {}
    context["dataset"] = Ovino.objects.all()
    return render(request, "ovino_index.html", context)


def create(request):
    context = {}
    form = OvinoForm(request.POST or None)
    if form.is_valid():
        form.save()
        return HttpResponseRedirect("/")
    context['form'] = form
    return render(request, "ovino_create.html", context)


def read(request, id):
    context = {}
    context["data"] = Ovino.objects.get(id=id)
    return render(request, "ovino_read.html", context)


def update(request, id):
    context = {}
    obj = get_object_or_404(Ovino, id=id)
    form = OvinoForm(request.POST or None, instance=obj)
    if form.is_valid():
        form.save()
        return HttpResponseRedirect("/ovino/" + id + "/read")
    context["form"] = form
    return render(request, "ovino_update.html", context)


def delete(request, id):
    context = {}
    obj = get_object_or_404(Ovino, id=id)
    if request.method == "POST" and obj:
        obj.delete()
        return HttpResponseRedirect("/")
    context["data"] = obj
    return render(request, "ovino_delete.html", context)