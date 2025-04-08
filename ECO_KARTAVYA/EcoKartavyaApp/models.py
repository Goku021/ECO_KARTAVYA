from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class EcoAction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    # Fields for each eco activity
    water = models.PositiveIntegerField(default=0)
    electricity = models.PositiveIntegerField(default=0)
    bags = models.PositiveIntegerField(default=0)
    rides = models.PositiveIntegerField(default=0)
    compost = models.PositiveIntegerField(default=0)
    plastic = models.PositiveIntegerField(default=0)
    trees = models.PositiveIntegerField(default=0)
    walk = models.PositiveIntegerField(default=0)
    cycle = models.PositiveIntegerField(default=0)
    ac_heater = models.PositiveIntegerField(default=0)
    natural_light = models.PositiveIntegerField(default=0)
    food_waste = models.PositiveIntegerField(default=0)
    reused = models.PositiveIntegerField(default=0)
    refilled_bottle = models.PositiveIntegerField(default=0)
    donated_clothes = models.PositiveIntegerField(default=0)
    idle_devices = models.PositiveIntegerField(default=0)
    custom_action = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.user.username} on {self.date}"
