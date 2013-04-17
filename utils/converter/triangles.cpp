#define GLM_SWIZZLE

#include <cmath>

#include "triangles.h"
#include "stdio.h"


using namespace glm;

#define PI 3.14159265358979323846264338327950288419716939937510f

// transform vector by matrix
vec3 transform(mat4 M, vec3 v) {
	vec4 v2 = vec4(v,0);
	return vec3(M * v2);
}

vec3 printv(vec3 v) {
	printf("%1.20f, %1.20f, %1.20f\n", v[0],v[1],v[2]);
}

double round(double d) {
	return floor(d + 0.5);
}

bool eq(vec3 A, vec3 B) {
	return round(A[0]) == round(B[0]) && round(A[1]) == round(B[1]) && round(A[2]) == round(B[2]);
}

float angle(vec3 A, vec3 B) {
	return acos(dot(normalize(A), normalize(B)));
}

// the vec4s are a vec3 axis with an angle in rad
// A is original, B is generated
void rot(vec4 & R1, vec4 & R2, vec3 A[3], vec3 B[3]) {
	mat4	M1;
	mat4	M2;

	vec3 Axis1;
	float Theta1;

	vec3 Axis2(0,0,0);
	float Theta2;

	if(normalize(abs(A[0])) == normalize(abs(A[1])) && normalize(abs(A[1])) == normalize(abs(A[2]))) {
		printf("???");
		return;
	}


	A[1] =  A[1] - A[0];
	A[2] =  A[2] - A[0];
	A[0] =  A[0] - A[0];

	B[1] =  B[1] - B[0];
	B[2] =  B[2] - B[0];
	B[0] =  B[0] - B[0];

	// vectors perpindicular to the triangles
	vec3 A_cross = normalize(cross(A[1], A[2]));
	vec3 B_cross = normalize(cross(B[1], B[2]));
	
	Axis1 = normalize(cross(A_cross, B_cross));
	// Axis is parallel to both triangle perpindiculars
	if(A_cross == B_cross || A_cross == normalize(-B_cross)) {
		// B_cross's normal is coming out of the Z axis
		Axis1 = vec3(1,0,0);
		Theta1 = A_cross == B_cross ? 0 : PI;
	} else {
		Theta1 = angle(A_cross, B_cross);//acos(dot(A_cross, B_cross) / (length(A_cross)/length(B_cross)));
	}

	if (isnan(Axis1[0])) {
		printf("Axis1 is nan\n");
		printv(A_cross);
		printv(B_cross);
		printf("\n");
		return;
	}
	if (isnan(Theta1)) {
		printf("Theta1 is nan\n");
		printv(A_cross);
		printv(B_cross);
		printf("\n");
		return;
	}
	
	// Generate M1 from the first Axis angle pair
	// M1 should put both of the triangles on the same plane
	M1 = rotate(M1, Theta1*(360/(2*PI)), Axis1);
	
	
	// Apply transformation to A
	A[1] = transform(M1, A[1]);
	A[2] = transform(M1, A[2]);
	
	
	A_cross = normalize(cross(A[1], A[2]));
	
	if(!eq(A_cross,B_cross) ) {
		printf("HAHA1 %f!\n", Theta1);
	}
	
	
	Axis2 = normalize(cross(A[1], B[1]));  // Should be an axis
	vec3 BackupA2 = normalize(cross(A[1], B[2]));
	
	// Triangles are either in the correct position
	// Or exactly 180 degrees apart on the same plane
	if(normalize(abs(A[1])) == normalize(abs(B[1]))) {
		//B's normal is along the X axis
		Axis2 = vec3(0,0,1);
		Theta2 = normalize(A[1]) == normalize(B[1]) ? 0 : PI;
	} else {
		Theta2 = angle(A[1], B[1]);//acos(dot(normalize(A[1]), normalize(B[1]))/ (length(A[1])/length(B[1])));
	}

	

	M2 = rotate(M2, Theta2*(360/(2*PI)), Axis2);
	A[1] = transform(M2, A[1]);
	A[2] = transform(M2, A[2]);

	if(!eq(A[1],B[1]) ) {
		printf("Fundamental!\n");
		printv(A[1]);
		printv(B[1]);
		printf("\n");
	}


	if(!eq(A[2],B[2]) ) {
		printf("HAHA3 %f!\n", Theta2);
		Axis2 = BackupA2;
		printv(Axis2);
		printv(A[1]);
		printv(B[1]);
		printv(A[2]);
		printv(B[2]);
		printf("\n");
	}

	if (isnan(Axis2[0])) {
		printf("Axis2 is NAN\n");
		//printv(A[1]);
		//printv(B[1]);
		printv(normalize(abs(A[1])));
		printv(normalize(abs(B[1])));
		printf("\n");
		return;
	}

	if (isnan(Theta2)) {
		printf("Theta2 is nan\n");
		return;
	}
	R1 = vec4(Axis1, Theta1);
	R2 = vec4(Axis2, Theta2);
			printf("\n");
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
	//printf("%1.100f\n", phi);
	C[0] = vec3(0,0,0);
	C[1] = vec3(length(p2),0,0);
	C[2] = vec3(cos(phi)*length(p3), sin(phi)*length(p3), 0);
}
