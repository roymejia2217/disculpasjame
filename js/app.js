/**
 * Punto de entrada principal de la aplicación
 * Este archivo importa y inicializa todos los módulos necesarios
 */
import { AppController } from './core/app-controller.js';

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => AppController.initialize());
