from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages


def home(request):
    return render(request, 'home.html')


def achivements_view(request):
    return render(request, 'achivements.html')


def learn(request):
    return render(request, 'learn.html')


from django.contrib.auth.decorators import login_required


@login_required
def redeem_view(request):
    return render(request, 'redeem.html')


@login_required
def community(request):
    return render(request, 'community.html')


from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from datetime import date, timedelta


@login_required(login_url='login')
def dashboard(request):
    user = request.user

    # Get the past 7 days
    last_7_days = [date.today() - timedelta(days=i) for i in range(6, -1, -1)]

    chart_data = []
    labels = []

    for day in last_7_days:
        day_data = EcoAction.objects.filter(user=user, date=day).aggregate(
            water=Sum('water'),
            electricity=Sum('electricity'),
            trees=Sum('trees')
        )
        total_points = (
                (day_data['water'] or 0) +
                (day_data['electricity'] or 0) +
                (day_data['trees'] or 0)
        )
        chart_data.append(total_points)
        labels.append(day.strftime("%b %d"))

    # Total Stats
    overall_totals = EcoAction.objects.filter(user=user).aggregate(
        total_water=Sum('water'),
        total_electricity=Sum('electricity'),
        total_trees=Sum('trees')
    )
    total_points = (
            (overall_totals['total_water'] or 0) +
            (overall_totals['total_electricity'] or 0) +
            (overall_totals['total_trees'] or 0)
    )

    # You can create a dynamic quote system here
    if total_points >= 1000:
        quote = "You're an Eco Legend! Keep inspiring. 🌍"
    elif total_points >= 500:
        quote = "You're doing amazing things for the planet! 🌿"
    elif total_points >= 200:
        quote = "Eco Champ in the making! 💪"
    elif total_points > 0:
        quote = "Every step counts. Keep going! 🌱"
    else:
        quote = "Start your green journey today! 🍃"

    co2_saved = total_points * 0.4  # just a sample logic
    streak = EcoAction.objects.filter(user=user, date=date.today()).exists()

    context = {
        'user': user,
        'points': total_points,
        'co2_saved': round(co2_saved, 2),
        'streak': 'Active' if streak else 'Inactive',
        'chart_data': chart_data,
        'chart_labels': labels,
        'quote': quote
    }

    return render(request, 'dashboard.html', context)


def eco_tips(request):
    return render(request, 'eco-tips.html')


from django.contrib.auth import authenticate, login


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            # Get the user with this email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "No account found with this email 📧")
            return render(request, 'login.html')

        # Authenticate using username (not email) and password
        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.first_name or user.username}! 🌿")
            return redirect('home')  # Make sure 'home' is your homepage URL name
        else:
            messages.error(request, "Invalid password 🔒")
            return render(request, 'login.html')

    return render(request, 'login.html')


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required(login_url='login')  # Redirect to login if not authenticated
def profile_view(request):
    user = request.user  # Logged-in user
    # You can fetch extra profile data if needed, like eco points, badges, etc.
    return render(request, 'profile.html', {'user': user})


# ================= SIGNUP VIEW =================

from django.contrib import messages
from django.contrib.auth.models import User


def signup_view(request):
    if request.method == 'POST':
        full_name = request.POST.get('username')  # This field is actually Full Name in the form
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm')

        # Extract a username (e.g., from email or full name)
        username = email.split('@')[0] if email else full_name.lower().replace(" ", "_")

        # Validate password confirmation
        if password != confirm_password:
            messages.error(request, "Passwords do not match ")
            return render(request, 'signup.html')

        # Check for existing users
        if User.objects.filter(username=username).exists():
            messages.error(request, "A user with this username already exists 🚫")
            return render(request, 'signup.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered 📧")
            return render(request, 'signup.html')

        # Create the user
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=full_name  # We store full name here for simplicity
        )
        user.save()

        messages.success(request, "Account created successfully! 🎉 You can now log in.")
        return redirect('login')  # Make sure 'login' is the name of your login URL

    return render(request, 'signup.html')


# ================= LOGOUT VIEW (optional) =================
def logout_view(request):
    logout(request)
    messages.info(request, "Logged out successfully 👋")
    return redirect('login')


def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Basic validation
        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('register')

        # Create user
        user = User.objects.create_user(username=username, password=password, email=email, first_name=full_name)
        user.save()
        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')

    return render(request, 'registration.html')


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from datetime import date
from .models import EcoAction


@login_required
def track_view(request):
    today = date.today()
    user = request.user

    eco_fields = [
        "water", "electricity", "bags", "rides", "compost", "plastic", "trees", "walk", "cycle",
        "ac_heater", "natural_light", "food_waste", "reused", "refilled_bottle",
        "donated_clothes", "idle_devices"
    ]

    eco_data = EcoAction.objects.filter(user=user, date=today).first()

    if request.method == "POST":
        form_data = request.POST
        eco_data, created = EcoAction.objects.get_or_create(user=user, date=today)

        for field in eco_fields:
            raw_value = form_data.get(field, '').strip()
            value = float(raw_value) if raw_value else 0
            setattr(eco_data, field, value)

        eco_data.custom_action = form_data.get('custom_action', '').strip()
        eco_data.save()
        return redirect('track')

    history = EcoAction.objects.filter(user=user).order_by('-date')[:10]

    return render(request, 'track.html', {
        'eco_data': eco_data,
        'eco_fields': eco_fields,
        'history': history
    })
