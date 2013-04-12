#include <cstdlib>
#include <math.h>
#include <iostream>

#include "structs.h"
#include "utils.h"
#include "reads.h"
#include "triangles.h"
#include <glm/glm.hpp>

using namespace std;

int main(int argc, char **argv)
{
	if (argc != 3) {
		cout << "Usage: converter file.obj output_name" << endl;
		return -1;
	}

	glm::vec3 A[3];
	glm::vec3 new_triangle[3];
	
	readobject model;
	read(argv[1],model);
	
	string name = string(string(argv[2]));
	ofstream out;
	out.open((name + ".js").c_str(), ios_base::trunc);

	out << "var "<< name <<" = [";

	for(int i = 0; i < model.facesize; i++) {
		for(int j = 0; j <= 2; j++) {
			A[j] = glm::vec3(
				model.vert[model.face[i].vert[j]-1].x,
				model.vert[model.face[i].vert[j]-1].y, 
				model.vert[model.face[i].vert[j]-1].z);
		}
		
		// Calculate 2d triangle
		Tri3dTo2d(new_triangle, A);

		out << "[";

		// Print 2d triangle
		for(int j = 0; j <= 2;j++) {
			out << "[" << new_triangle[j].x << "," << new_triangle[j].y << "," << new_triangle[j].z << "]," << endl;
		}
		// Print translation
		out << "[" << A[0].x << "," << A[0].y << "," << A[0].z << "]," << endl;

		// Caclulate 2 rotations
		glm::vec4 R1;
		glm::vec4 R2;
		rot(R1, R2, A, new_triangle);

		// Print rotations
		out << "[" << R1[0] << "," << R1[1] << "," << R1[2] << "," << R1[3] << "]," << endl;
		out << "[" << R2[0] << "," << R2[1] << "," << R2[2] << "," << R2[3] << "]," << endl;
	
		out << "]," << endl<<endl;
	}
	out << "];";
	out << argv[2] << ".type = Entity.ModelType.TriModel" <<endl;
	return 0;
}
