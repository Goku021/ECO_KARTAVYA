from django import template

register = template.Library()


@register.filter
def get_field(obj, field_name):
    return getattr(obj, field_name, '')


@register.filter
def replace_underscore(value):
    return str(value).replace('_', ' ').title()
