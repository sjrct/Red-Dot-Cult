#ifndef _structs_
#define _structs_
struct vec
{
	float x,y,z;
};

struct poly
{
	int vert [10];
};
struct mtls
{
	char name [30];
	int face;
};

struct material
{
	char name [30];
	float Ns,Ni,d;
	float Ka [3], Kd [3], Ks [3];
	int illum;
	
};
struct readobject
{
	vec * vert;
	poly * face;
	vec * vn;
	poly * facen;

	char mtllib[30];
	mtls mtl [100];
	int mtlcount;
	material materials[100];
	int materialnum;

	vec maxvert;
	vec minvert;

	int facesize;
	int vertsize;

	float maxv;

	char shading[50];
	int shadingpos[50];
	int shadesize;

};





#endif
