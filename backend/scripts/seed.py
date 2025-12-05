#!/usr/bin/env python3
"""
Script para poblar la base de datos con datos de prueba
10 historias clínicas, 3 doctores, 4 pacientes
"""

import requests
import json
from datetime import datetime, timedelta
import random

# Configuración
GRAPHQL_URL = "http://localhost:3000/graphql"

# Datos de Doctores
DOCTORES = [
    {
        "nombre": "Dr. Carlos Rodríguez",
        "cedulaProfesional": "MED-2018-001",
        "especialidad": "Medicina General"
    },
    {
        "nombre": "Dra. María González",
        "cedulaProfesional": "MED-2019-002",
        "especialidad": "Pediatría"
    },
    {
        "nombre": "Dr. José Martínez",
        "cedulaProfesional": "MED-2020-003",
        "especialidad": "Cardiología"
    }
]

# Datos de Pacientes
PACIENTES = [
    {
        "nombre": "Juan",
        "apellido": "Pérez",
        "cedula": "1234567890",
        "edad": 45,
        "genero": "Masculino"
    },
    {
        "nombre": "Ana",
        "apellido": "López",
        "cedula": "0987654321",
        "edad": 32,
        "genero": "Femenino"
    },
    {
        "nombre": "Pedro",
        "apellido": "Ramírez",
        "cedula": "1122334455",
        "edad": 28,
        "genero": "Masculino"
    },
    {
        "nombre": "Laura",
        "apellido": "Torres",
        "cedula": "5544332211",
        "edad": 52,
        "genero": "Femenino"
    }
]

# Datos de Historias Clínicas
HISTORIAS_CLINICAS = [
    {
        "paciente": PACIENTES[0],  # Juan Pérez
        "doctor": DOCTORES[0],      # Dr. Carlos Rodríguez
        "motivoConsulta": "Dolor abdominal intenso",
        "diagnostico": "Gastritis aguda",
        "tratamiento": "Omeprazol 20mg cada 12 horas por 14 días, dieta blanda",
        "dias_atras": 30
    },
    {
        "paciente": PACIENTES[0],  # Juan Pérez
        "doctor": DOCTORES[2],      # Dr. José Martínez
        "motivoConsulta": "Presión arterial elevada",
        "diagnostico": "Hipertensión arterial grado 1",
        "tratamiento": "Enalapril 10mg diario, reducir sal en dieta, ejercicio moderado",
        "dias_atras": 15
    },
    {
        "paciente": PACIENTES[1],  # Ana López
        "doctor": DOCTORES[1],      # Dra. María González
        "motivoConsulta": "Fiebre y tos persistente",
        "diagnostico": "Bronquitis aguda",
        "tratamiento": "Amoxicilina 500mg cada 8 horas por 7 días, jarabe expectorante",
        "dias_atras": 20
    },
    {
        "paciente": PACIENTES[1],  # Ana López
        "doctor": DOCTORES[0],      # Dr. Carlos Rodríguez
        "motivoConsulta": "Dolor de cabeza frecuente",
        "diagnostico": "Migraña tensional",
        "tratamiento": "Paracetamol 500mg cuando sea necesario, técnicas de relajación",
        "dias_atras": 45
    },
    {
        "paciente": PACIENTES[2],  # Pedro Ramírez
        "doctor": DOCTORES[0],      # Dr. Carlos Rodríguez
        "motivoConsulta": "Dolor en rodilla derecha",
        "diagnostico": "Esguince de ligamentos grado 1",
        "tratamiento": "Reposo relativo, hielo local, ibuprofeno 400mg cada 8 horas",
        "dias_atras": 10
    },
    {
        "paciente": PACIENTES[2],  # Pedro Ramírez
        "doctor": DOCTORES[1],      # Dra. María González
        "motivoConsulta": "Control de rutina",
        "diagnostico": "Estado de salud normal",
        "tratamiento": "Continuar con hábitos saludables, control anual",
        "dias_atras": 60
    },
    {
        "paciente": PACIENTES[3],  # Laura Torres
        "doctor": DOCTORES[2],      # Dr. José Martínez
        "motivoConsulta": "Dolor torácico al esfuerzo",
        "diagnostico": "Angina de pecho estable",
        "tratamiento": "Atorvastatina 20mg nocturno, AAS 100mg diario, nitroglicerina sublingual PRN",
        "dias_atras": 5
    },
    {
        "paciente": PACIENTES[3],  # Laura Torres
        "doctor": DOCTORES[0],      # Dr. Carlos Rodríguez
        "motivoConsulta": "Dolor lumbar crónico",
        "diagnostico": "Lumbalgia mecánica",
        "tratamiento": "Fisioterapia, ejercicios de estiramiento, paracetamol PRN",
        "dias_atras": 25
    },
    {
        "paciente": PACIENTES[3],  # Laura Torres
        "doctor": DOCTORES[2],      # Dr. José Martínez
        "motivoConsulta": "Control cardiovascular",
        "diagnostico": "Cardiopatía isquémica controlada",
        "tratamiento": "Continuar medicación actual, dieta cardiosaludable, ejercicio moderado",
        "dias_atras": 35
    },
    {
        "paciente": PACIENTES[1],  # Ana López
        "doctor": DOCTORES[1],      # Dra. María González
        "motivoConsulta": "Resfriado común",
        "diagnostico": "Rinofaringitis viral",
        "tratamiento": "Hidratación abundante, reposo, paracetamol 500mg si fiebre",
        "dias_atras": 3
    }
]


def crear_historia_clinica(historia):
    """Crea una historia clínica usando la mutation de GraphQL"""
    
    # Calcular fecha (días atrás desde hoy)
    fecha = (datetime.now() - timedelta(days=historia['dias_atras'])).strftime('%Y-%m-%d')
    
    mutation = """
    mutation CreateMedicalRecord($input: MedicalRecordInput!) {
        createMedicalRecord(input: $input) {
            id
            motivoConsulta
            diagnostico
            tratamiento
            fecha
            paciente {
                nombre
                apellido
                cedula
            }
            doctor {
                nombre
                cedulaProfesional
                especialidad
            }
        }
    }
    """
    
    variables = {
        "input": {
            "paciente": historia["paciente"],
            "doctor": historia["doctor"],
            "motivoConsulta": historia["motivoConsulta"],
            "diagnostico": historia["diagnostico"],
            "tratamiento": historia["tratamiento"],
            "fecha": fecha
        }
    }
    
    payload = {
        "query": mutation,
        "variables": variables
    }
    
    try:
        response = requests.post(GRAPHQL_URL, json=payload, headers={"Content-Type": "application/json"})
        response.raise_for_status()
        result = response.json()
        
        if "errors" in result:
            print(f"❌ Error: {result['errors'][0]['message']}")
            return False
        
        data = result["data"]["createMedicalRecord"]
        print(f"✅ Historia clínica creada:")
        print(f"   Paciente: {data['paciente']['nombre']} {data['paciente']['apellido']} (CC: {data['paciente']['cedula']})")
        print(f"   Doctor: {data['doctor']['nombre']} - {data['doctor']['especialidad']}")
        print(f"   Diagnóstico: {data['diagnostico']}")
        print(f"   Fecha: {data['fecha']}")
        print()
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error de conexión: {e}")
        return False


def verificar_conexion():
    """Verifica que el servidor GraphQL esté disponible"""
    try:
        response = requests.post(
            GRAPHQL_URL,
            json={"query": "{ __typename }"},
            timeout=5
        )
        return response.status_code == 200
    except:
        return False


def main():
    print("=" * 70)
    print("SEED - POBLACIÓN DE BASE DE DATOS")
    print("Sistema de Gestión de Historias Clínicas")
    print("=" * 70)
    print()
    
    # Verificar conexión
    print("🔍 Verificando conexión con el servidor GraphQL...")
    if not verificar_conexion():
        print(f"❌ No se puede conectar a {GRAPHQL_URL}")
        print("   Asegúrate de que el backend esté corriendo:")
        print("   - Con Docker: docker-compose up -d")
        print("   - Local: cd backend && npm start")
        return
    
    print(f"✅ Conexión exitosa con {GRAPHQL_URL}")
    print()
    
    # Resumen
    print("📊 RESUMEN DEL SEED:")
    print(f"   - {len(DOCTORES)} doctores")
    print(f"   - {len(PACIENTES)} pacientes")
    print(f"   - {len(HISTORIAS_CLINICAS)} historias clínicas")
    print()
    print("-" * 70)
    print()
    
    # Crear historias clínicas
    exitosos = 0
    fallidos = 0
    
    for i, historia in enumerate(HISTORIAS_CLINICAS, 1):
        print(f"[{i}/{len(HISTORIAS_CLINICAS)}] Creando historia clínica...")
        if crear_historia_clinica(historia):
            exitosos += 1
        else:
            fallidos += 1
    
    # Resumen final
    print("-" * 70)
    print()
    print("📈 RESULTADO FINAL:")
    print(f"   ✅ Exitosos: {exitosos}")
    print(f"   ❌ Fallidos: {fallidos}")
    print()
    
    if exitosos > 0:
        print("🎉 Base de datos poblada exitosamente!")
        print()
        print("💡 Puedes consultar los datos en:")
        print(f"   - GraphQL Playground: {GRAPHQL_URL}")
        print(f"   - Frontend: http://localhost:3001")
        print()
        print("🔍 Cédulas de pacientes para buscar:")
        for p in PACIENTES:
            print(f"   - {p['nombre']} {p['apellido']}: {p['cedula']}")
    else:
        print("⚠️  No se pudo crear ninguna historia clínica")
    
    print()
    print("=" * 70)


if __name__ == "__main__":
    main()
