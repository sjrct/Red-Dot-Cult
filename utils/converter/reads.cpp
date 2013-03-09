#include "reads.h"
using namespace std;

void read(char * filename, readobject & model)
{
	ifstream file;
	file.open(filename);

	if(file.fail())	return ;


	int vbuffer=100;
	int vcount = 0;
	model.vert = new vec[vbuffer];

	int fbuffer=100;
	int fcount =0;
	model.face=new poly[fbuffer];

	int vnbuffer=100;
	int vncount=0;
	model.vn=new vec[vbuffer];

	int i;
	int j;
	int filecount;

	model.facen=new poly[fbuffer];

	
	model.facen[0].vert[0]=-1;	// sets the begining of face normals to -1 for reference ***ASSUMING ALL FACES HAVE NORMALS OR NOT
	model.mtllib[0] ='\0';


	char p;
	char prev='\n';
	p=file.get();
	while(p != EOF)
	{
		if(prev == '\n')
			switch(p)
			{
				case 'v':						//vertex and vertex normal
					if(file.get()== ' ')				//vertex
					{
						file >> model.vert[vcount].x;
						file >> model.vert[vcount].y;
						file >> model.vert[vcount].z;
						vcount++;
						if(vbuffer <= vcount)			//double the array
						{
							vec * tmp;
							tmp = new vec [2*vbuffer];
							cpy(vbuffer, 2*vbuffer, model.vert, tmp);
							model.vert=tmp;
							vbuffer=vbuffer*2;
							tmp=NULL;
						}
					}
					else						//vertex normal
					{
						file >> model.vn[vncount].x;
						file >> model.vn[vncount].y;
						file >> model.vn[vncount].z;
						vncount++;
						if(vnbuffer <= vncount)			//double the array
						{
							vec * tmp;
							tmp = new vec [2*vnbuffer];
							cpy(vnbuffer, 2*vnbuffer, model.vn, tmp);
							model.vn=tmp;
							vnbuffer=vnbuffer*2;
							tmp=NULL;
						}
					}
					break;
				case 'f':						//face
					i=0;
					j=0;
					while(p != '\n')
        			        {
						if(p == ' ')
						{
							file >> model.face[fcount].vert[i];
							i++;
							model.face[fcount].vert[i] = -1;
						}
						if( p== '/' && prev == '/')
						{
							file >> model.facen[fcount].vert[j];
							j++;
							model.facen[fcount].vert[j] = -1;
						}

						prev=p;
						p=file.get();
					}
					fcount++;
					if(fbuffer <= fcount)				//double the array
					{
						poly * tmp;
						poly * tmpn;
						tmp = new poly [2*fbuffer];
						tmpn = new poly [2*fbuffer];
						cpf(fbuffer, 2*fbuffer, model.face, tmp);
						cpf(fbuffer, 2*fbuffer,model.facen,tmpn);
						model.face=tmp;
						model.facen=tmpn;
						fbuffer=fbuffer*2;
						tmp=NULL;
					}
					break;
				case 's':						//Shading

					file.get();
					model.shading[model.shadesize]=file.get();
					model.shadingpos[model.shadesize]=fcount;
					p=file.get();
					p=file.get();
					model.shadesize++;
					break;
				case '#':						//comment
					while(p!='\n')
					{
						cout <<p;
						p=file.get();
					}
					cout <<p;
					break;
				case 'm':						//material lib
					filecount=0;
					while(p!=' ')
						p=file.get();
					p=file.get();
					while(p!='\n')
					{
						model.mtllib[filecount]=p;
						filecount++;
						p=file.get();
					}
					model.mtllib[filecount] = '\0';
					break;
				case 'u':						//use material for next face
					while(p!=' ')
						p=file.get();
					file >> model.mtl[model.mtlcount].name;		//set name
					model.mtl[model.mtlcount].face=fcount;		//material starts at next face
					model.mtlcount++;				//set next material to be added
					model.mtl[model.mtlcount].face =-1;		//next material =-1
			}
		prev=p;
		p=file.get();
	}
	model.vertsize=vcount-1;
	model.facesize=fcount;
	file.close();

}
/*void readMaterials(char * mtllib, material * materials, int & matnum)
{
	cout <<endl<< "Reading " <<mtllib;
	ifstream file;
	file.open(mtllib);
	if(file.fail())
	{
		cerr <<"FAILED OPENING MATERAIL LIB";
		return;
	}
	char p;
	char prev;
	char asdf[10];
	
	prev='\n';
	p = file.get();
	while(p!=EOF)
	{
		if(p=='n' && prev =='\n')
		{
			file.get();
			file.get();
			file.get();
			file.get();
			file.get();
			file.get();
			file >> materials[matnum].name;

			file.get();
			file.get();
			file.get();
			file >> materials[matnum].Ns;

			file.get();
			file.get();
			file.get();
			file >> materials[matnum].Ka[0];
			file >> materials[matnum].Ka[1];
			file >> materials[matnum].Ka[2];

			file.get();
			file.get();
			file.get();
			file >> materials[matnum].Kd[0];
			file >> materials[matnum].Kd[1];
			file >> materials[matnum].Kd[2];


			file.get();
			file.get();
			file.get();
			file >> materials[matnum].Ks[0];
			file >> materials[matnum].Ks[1];
			file >> materials[matnum].Ks[2];

			file.get();
			file.get();
			file.get();
			file >> materials[matnum].Ni;

			file.get();
			file.get();
			file >> materials[matnum].d;

			file>>asdf;
			file >> materials[matnum].illum;
/*			cerr <<endl<< "newmtl "<<matnum<< " " << materials[matnum].name <<endl;
			cerr << "Ns " << materials[matnum].Ns<<endl;
			cerr << "Ka " << materials[matnum].Ka[0] << " " << materials[matnum].Ka[1]<< " " << materials[matnum].Ka[2]<<endl;
			cerr << "Kd " << materials[matnum].Kd[0] << " " << materials[matnum].Kd[1]<< " " << materials[matnum].Kd[2]<<endl;
			cerr << "Ks " << materials[matnum].Ks[0] << " " << materials[matnum].Ks[1]<< " " << materials[matnum].Ks[2]<<endl;
			cerr << "Ni " << materials[matnum].Ni <<endl;
			cerr << "d " << materials[matnum].d <<endl;
			cerr << "illum " << materials[matnum].illum <<endl;*/
/*			matnum++;
		}
		prev=p;
		p=file.get();
	}
	file.close();
	cout << endl << "Matierials read:" << matnum<<endl;
}*/
