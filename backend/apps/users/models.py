import logging

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.db.models.manager import BaseManager
from phonenumber_field.modelfields import PhoneNumberField
from services.auth_services.auth_services import AuthRoles
from services.invite_code import CodeMethods
from utils.base_models import BaseUserModel

from apps.authenticate.models import AuthUser

logger = logging.getLogger()


class PlayerManger(BaseUserManager):
    """Менеджер Игрока."""

    def create_user(self, email, password, coordinator_id):
        """Создает и возвращает пользователя с имэйлом, паролем и именем."""
        if email is None:
            raise TypeError("Players must have an email address.")

        if password is None:
            raise TypeError("Players must have a password.")

        if coordinator_id is None:
            raise TypeError("Players must have a coordinator id.")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.coordinator_id_id = coordinator_id
        user.role_id = AuthRoles().get_player_role_id()
        user.is_active = True

        user.save()

        return user


class AttributeAndValueManagerManger(BaseManager):
    """Менеджер для модели игрока для взаимодействия с атрибутами."""

    @staticmethod
    def set(attributes_and_value: dict, user_id: int, coordinator_attrs):
        """Метод создаёт или обновляет строку из модели AttributeAndValue."""
        for attribute in coordinator_attrs:
            value = attributes_and_value.pop(str(attribute.id))
            AttributeAndValue.objects.update_or_create(
                attribute_id=attribute.id,
                player_id=user_id,
                defaults={"value": value},
            )

        AttributeAndValue.objects.filter(player_id=user_id,).exclude(
            attribute_id__in=[attribute.id for attribute in coordinator_attrs]
        ).delete()


class Player(AuthUser, BaseUserModel):
    """Модель игрока."""

    attributes = models.ManyToManyField(
        "users.Attribute", through="users.AttributeAndValue"
    )
    coordinator_id = models.ForeignKey(
        "users.Coordinator", related_name="coor", on_delete=models.CASCADE
    )
    is_player = True

    objects = PlayerManger()
    attribute_manger = AttributeAndValueManagerManger()

    class Meta:
        """Мета класс."""

        db_table = "players"
        verbose_name = "player"
        verbose_name_plural = "players"


class CoordinatorManager(BaseUserManager):
    """Менеджер Координатора."""

    def create_coordinator(self, email, password):
        """Создает и возвращает пользователя с имэйлом, паролем и именем."""
        if email is None:
            raise TypeError("Coordinators must have an email address.")

        if password is None:
            raise TypeError("Coordinators must have a password.")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_active = True
        user.role_id = AuthRoles().get_coordinator_role_id()
        user.save()
        user.invite_code = CodeMethods.generate_code(user.id)
        user.save()

        return user


class Coordinator(AuthUser, BaseUserModel):
    """Модель координатора."""

    phone_number = PhoneNumberField(region="RU", blank=True, null=True)
    company = models.CharField(blank=True, null=True, max_length=50)
    job_title = models.CharField(blank=True, null=True, max_length=50)
    birthday = models.DateField(blank=True, null=True)
    invite_code = models.CharField(max_length=20, null=True)
    attributes = models.ManyToManyField("users.Attribute")

    is_coordinator = True

    objects = CoordinatorManager()

    class Meta:
        """Мета класс."""

        db_table = "coordinators"
        verbose_name = "coordinator"
        verbose_name_plural = "coordinators"


class Attribute(models.Model):
    """Модель атрибута."""

    attribute = models.CharField(max_length=150)

    class Meta:
        """Мета класс."""

        db_table = "attributes"
        verbose_name = "attribute"
        verbose_name_plural = "attributes"


class AttributeAndValue(models.Model):
    """Модель атрибута и значения."""

    player = models.ForeignKey("users.Player", on_delete=models.CASCADE)
    attribute = models.ForeignKey("users.Attribute", on_delete=models.CASCADE)
    value = models.CharField(max_length=150)

    class Meta:
        """Мета класс."""

        db_table = "attributes_and_value"
        verbose_name = "attributes_and_value"
        verbose_name_plural = "attributes_and_values"


class UserRole(models.Model):
    """Модель роли."""

    name = models.CharField(max_length=150)

    def __str__(self):
        """Возвращает названия роли."""
        return f"{self.name}"

    class Meta:
        """Мета класс."""

        db_table = "roles"
        verbose_name = "role"
        verbose_name_plural = "roles"
