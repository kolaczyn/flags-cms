# Feature Flags

Celem projektu jest zbudowanie projektu do zarządzania feature flagami

## Planowane feature-y

- [ ] Dodawanie nowych feature flag, które są wykorzystywane
- [ ] Globalne włączenie oraz wyłączenie feature flagi
- [ ] Na początku wykorzystywane tylko w tym samym projekcie
- [ ] Potem wykorzystywane w innym projekcie
- [ ] Dobry type checking (nie może być to zwykły string)
- [ ] Można przełączać pewne flagi tylko dla uprzywilejowanej grupy użytkowników (np. osoby rozwijające projekt, nie użytkownicy)
- [ ] Można przełączać pewne flagi dla konkretnych użytkowników
- [ ] Testy A/B — flagi ustawione tylko dla wybranego procenta użytkowników
- [ ] Testy A/B — flaga stopniowo idą od 0% do 100% przez pewien okres
- [ ] Testy A/B — można wstrzymać propagację lub ustawić ją do 0%
- [ ] Mechanizm/ protokół na usuwanie starych flag

## Architektura

- Angular z najnowszymi praktykami na frontendzie 
- Na początku bez backendu/mockowy
- Potem .NET
- Potem .NET z clean architecture
- Potem rozwijanie równolegle fullstackowo obu rozwiązań z kolejnymi feature-ami
- Postarać się zintegrować Nx do projektu
- Użyć Nx do tworzenia murów wokół modułów (zainspirowane github.com/marcinmilewicz/ddd-frontend-example)

## Cel projektu pod względem nauczania

- Chcę poćwiczyć sobie tworzenie nowoczesnego Angulara
- Poćwiczyć sobie podejście z kursu angularstart.com, ale dostosować do mnie
- Napisać testy jednostkowe/integracyjne w Angular
- Przypomnieć sobie .NET oraz Clean Architecture
- Napisać w końcu .NET z autoryzacją
- Nauczyć się więcej na temat Nx
- Ładowanie zmiennych środowiskowych natywnie (build-time)

## Być może w przyszłości

Ogarnąć logi (frontend + backend)

## Jak uruchomić

```sh
yarn backend # w jednym terminalu
yarn start # w drugim terminalu
```
