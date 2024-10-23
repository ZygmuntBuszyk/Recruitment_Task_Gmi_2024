# Task Management Application for GMI SOFTWARE

A full-stack task management application built with React Native (Expo) and NestJS.

## Project Structure

- `/frontend` - React Native mobile application
- `/backend` - NestJS API server

## Task Content
Zadanie Rekrutacyjne: Full-Stack Developer z naciskiem na Mobile
Opis zadania
Twoim zadaniem jest stworzenie aplikacji mobilnej, która będzie pełniła rolę prostego systemu zarządzania zadaniami (to-do list). Skupimy się na funkcjonalnościach związanych z mobile, ale backend również jest ważnym elementem zadania.

Technologie
Mobile: React Native z Expo
Backend: Nest.JS
Opis funkcjonalności
1. Backend (Nest.JS)
   Utwórz API umożliwiające zarządzanie zadaniami. Endpointy powinny obejmować:

Dodawanie nowego zadania (POST /tasks)
Pobieranie listy zadań (GET /tasks)
Pobieranie szczegółów konkretnego zadania (GET /tasks/:id)
Aktualizacja istniejącego zadania (PUT /tasks/:id)
Usuwanie zadania (DELETE /tasks/:id)
Zadanie powinno mieć następujące pola:

ID (generowane automatycznie)
Tytuł
Opis
Status (np. „do zrobienia”, „w trakcie”, „zakończone”)
Data utworzenia
Użyj bazy danych PostgreSQL do przechowywania danych, jako ORM skorzystaj z Prismy.

2. Mobile (React Native z Expo)
   Stwórz interfejs użytkownika umożliwiający zarządzanie zadaniami. Ekrany powinny obejmować:

Lista zadań: Wyświetlanie wszystkich zadań w formie listy z możliwością przejścia do szczegółów, edycji i usunięcia.
Formularz dodawania/edycji zadania: Formularz do dodawania nowego zadania oraz edycji istniejącego.
Ekran szczegółów zadania: Wyświetlanie szczegółowych informacji o zadaniu.
Skorzystaj z API stworzonego w backendzie do pobierania i wysyłania danych. Dodaj możliwość oznaczania zadań jako ukończone bezpośrednio z listy zadań. Zadbaj o przyjazny interfejs użytkownika oraz responsywność aplikacji na różnych urządzeniach mobilnych.

Kryteria oceny
Poprawność działania API (zgodność z podanymi wymaganiami).
Czytelność i organizacja kodu.
Użycie najlepszych praktyk w kodowaniu (np. walidacja danych, obsługa błędów).
Estetyka i funkcjonalność interfejsu użytkownika.
Zastosowanie technologii zgodnie z wymaganiami zadania.
Optymalizacja zapytań i efektywność działania aplikacji.
Responsywność aplikacji mobilnej.
Dodatkowe informacje
Skup się na stworzeniu funkcjonalnego API i interfejsu; nie musisz zaimplementować rozbudowanych funkcjonalności. Każde rozszerzenie może zadziałać na Twój plus!
Wykorzystaj dokumentację Nest.JS i React Native z Expo do realizacji zadania.
Pamiętaj o odpowiedniej walidacji danych oraz obsłudze błędów w API.
Postaraj się, aby interfejs był intuicyjny i łatwy w użyciu.
Dostarczenie
Kod źródłowy projektu umieść na platformie GitHub lub GitLab.
Dołącz instrukcję uruchomienia projektu w pliku README.md.