#define GLM_SWIZZLE
#include "triangles.h"
#include "stdio.h"

using namespace glm;

#define PI 3.14159265358979323846264338327950288419716939937510f

// transform vector by matrix
vec3 transform(mat4 M, vec3 v) {
	vec4 v2 = vec4(v,0);
	return vec3(M * v2);
}

// the vec4s are a vec3 axis with an angle in rad
// A is original, B is generated
void rot(vec4 & R1, vec4 & R2, vec3 A[3], vec3 B[3]) {
	mat4	M1;
	mat4	M2;

	A[1] =  A[1] - A[0];
	A[2] =  A[2] - A[0];
	A[0] =  A[0] - A[0];

	B[1] =  B[1] - B[0];
	B[2] =  B[2] - B[0];
	B[0] =  B[0] - B[0];

	// vectors perpindicular to the triangles
	vec3 A_cross = normalize(cross(A[1], A[2]));
	vec3 B_cross = normalize(cross(B[1], B[2]));
	
	vec3 Axis1;
	float Theta1;
	
	
	Axis1 = normalize(cross(A_cross, B_cross));
	// Axis is parallel to both triangle perpindiculars
	if(A_cross == B_cross || A_cross == normalize(-B_cross)) {
		// B_cross's normal is coming out of the Z axis
		Axis1 = vec3(1,0,0);
		Theta1 = A_cross == B_cross ? 0 : PI;
	} else {
		Theta1 = acos(dot(A_cross, B_cross));
	}
	
	// Generate M1 from the first Axis angle pair
	// M1 should put both of the triangles on the same plane
	M1 = rotate(M1, Theta1*(360/(2*PI)), Axis1);
	
	vec3 Axis2;
	float Theta2;
	
	// Apply transformation to A
	A[1] = transform(M1, A[1]);
	A[2] = transform(M1, A[2]);
	
	Axis2 = normalize(cross(A[1], B[1]));  // Should be an axis
	
	// Triangles are either in the correct position
	// Or exactly 180 degrees apart on the same plane
	if(normalize(A[1]) == normalize(B[1]) || normalize(A[1]) == normalize(-B[1])) {
		//B's normal is along the X axis
		Axis2 = vec3(0,1,0);
		Theta2 = normalize(A[1]) == normalize(B[1]) ? 0 : PI;
	} else {
		Theta2 = acos(dot(normalize(A[1]), normalize(B[1])));
	}

	A[1] = transform(M2, A[1]);
	A[2] = transform(M2, A[2]);

	R1 = vec4(Axis1, Theta1);
	R2 = vec4(Axis2, Theta2);
}

// Generates a 2d triangle of the same dimensions as the 3d triangle
void Tri3dTo2d(vec3 C[3], vec3 A[3]) {
	vec3 p1 = A[0];
	vec3 p2 = A[1];
	vec3 p3 = A[2];
	
	p2 = p2 - p1;
	p3 = p3 - p1;
	p1 = p1 - p1;

	float phi = acos(dot(p2, p3) / (length(p2) * length(p3)));
	C[0] = vec3(0,0,0);
	C[1] = vec3(length(p2),0,0);
	C[2] = vec3(cos(phi)*length(p3), sin(phi)*length(p3), 0);
}
