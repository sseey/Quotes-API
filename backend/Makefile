# Variables
VENV_DIR=backend/venv
PYTHON=python3
REQ_FILE=backend/requirements.txt

.PHONY: install

# Installer les dépendances
install:
	@echo "🔹 Installation des dépendances..."
	@$(PYTHON) -m pip install --upgrade pip
	@$(PYTHON) -m pip install -r $(REQ_FILE)
