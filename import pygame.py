import pygame
import random
import time

# Inicializar Pygame
pygame.init()

# Constantes
ANCHO = 800
ALTO = 600
TAMANO_CELDA = 20
VELOCIDAD = 15

# Colores
NEGRO = (0, 0, 0)
VERDE = (0, 255, 0)
ROJO = (255, 0, 0)
BLANCO = (255, 255, 255)

# Configurar la ventana
ventana = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption('Snake - El juego de la serpiente')
reloj = pygame.time.Clock()

class Snake:
    def __init__(self):
        self.posicion = [(ANCHO//2, ALTO//2)]
        self.direccion = [TAMANO_CELDA, 0]
        self.crecer = False

    def mover(self):
        nueva_pos = (
            self.posicion[0][0] + self.direccion[0],
            self.posicion[0][1] + self.direccion[1]
        )
        
        if not self.crecer:
            self.posicion.pop()
        else:
            self.crecer = False
            
        self.posicion.insert(0, nueva_pos)

    def cambiar_direccion(self, nueva_direccion):
        # Evitar que la serpiente vaya en dirección opuesta
        if (nueva_direccion[0] * -1, nueva_direccion[1] * -1) != tuple(self.direccion):
            self.direccion = list(nueva_direccion)

    def comprobar_colision(self):
        cabeza = self.posicion[0]
        # Colisión con los bordes
        if (cabeza[0] < 0 or cabeza[0] >= ANCHO or 
            cabeza[1] < 0 or cabeza[1] >= ALTO):
            return True
        # Colisión con sí misma
        if cabeza in self.posicion[1:]:
            return True
        return False

    def dibujar(self, ventana):
        for segmento in self.posicion:
            pygame.draw.rect(ventana, VERDE, 
                           (segmento[0], segmento[1], TAMANO_CELDA, TAMANO_CELDA))

class Manzana:
    def __init__(self):
        self.reubicar()

    def reubicar(self):
        self.posicion = (
            random.randrange(0, ANCHO - TAMANO_CELDA, TAMANO_CELDA),
            random.randrange(0, ALTO - TAMANO_CELDA, TAMANO_CELDA)
        )

    def dibujar(self, ventana):
        pygame.draw.rect(ventana, ROJO, 
                        (self.posicion[0], self.posicion[1], TAMANO_CELDA, TAMANO_CELDA))

def mostrar_puntuacion(ventana, puntos):
    fuente = pygame.font.Font(None, 36)
    texto = fuente.render(f'Puntuación: {puntos}', True, BLANCO)
    ventana.blit(texto, (10, 10))

def mostrar_game_over(ventana, puntos):
    fuente = pygame.font.Font(None, 72)
    texto_game_over = fuente.render('¡GAME OVER!', True, BLANCO)
    texto_puntos = fuente.render(f'Puntuación final: {puntos}', True, BLANCO)
    texto_reiniciar = fuente.render('Presiona ESPACIO para reiniciar', True, BLANCO)
    
    ventana.blit(texto_game_over, 
                 (ANCHO//2 - texto_game_over.get_width()//2, ALTO//2 - 80))
    ventana.blit(texto_puntos, 
                 (ANCHO//2 - texto_puntos.get_width()//2, ALTO//2))
    ventana.blit(texto_reiniciar, 
                 (ANCHO//2 - texto_reiniciar.get_width()//2, ALTO//2 + 80))

def juego_principal():
    snake = Snake()
    manzana = Manzana()
    puntos = 0
    jugando = True
    game_over = False

    while jugando:
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                return
            elif evento.type == pygame.KEYDOWN:
                if game_over:
                    if evento.key == pygame.K_SPACE:
                        return juego_principal()
                else:
                    if evento.key == pygame.K_UP:
                        snake.cambiar_direccion((0, -TAMANO_CELDA))
                    elif evento.key == pygame.K_DOWN:
                        snake.cambiar_direccion((0, TAMANO_CELDA))
                    elif evento.key == pygame.K_LEFT:
                        snake.cambiar_direccion((-TAMANO_CELDA, 0))
                    elif evento.key == pygame.K_RIGHT:
                        snake.cambiar_direccion((TAMANO_CELDA, 0))

        if not game_over:
            snake.mover()

            # Comprobar colisión con la manzana
            if snake.posicion[0] == manzana.posicion:
                snake.crecer = True
                manzana.reubicar()
                puntos += 10

            # Comprobar colisión con paredes o consigo misma
            if snake.comprobar_colision():
                game_over = True

        # Dibujar
        ventana.fill(NEGRO)
        snake.dibujar(ventana)
        manzana.dibujar(ventana)
        mostrar_puntuacion(ventana, puntos)

        if game_over:
            mostrar_game_over(ventana, puntos)

        pygame.display.flip()
        reloj.tick(VELOCIDAD)

if __name__ == "__main__":
    juego_principal()
    pygame.quit()