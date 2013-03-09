#ifndef _triangles_
#define _triangles_

#include <stdlib.h>
#include <cmath>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

void Tri3dTo2d(glm::vec3*, glm::vec3*);
void rot(glm::vec4 & R1, glm::vec4 & R2, glm::vec3 A[3], glm::vec3 B[3]);

#endif
