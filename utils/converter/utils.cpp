#include "utils.h"

void cpy(int size1,int size2, vec * in, vec * out)
{
	for(int i=0;i<=size1;i++)
	{
		out[i]=in[i];
	}
}

void cpf(int size1,int size2, poly * in, poly * out)
{
	for(int i=0;i<=size1;i++)
		for(int j =0; j<10;j++)
			(out[i]).vert[j]=(in[i]).vert[j];
}

bool same(char a[30], char b[30])
{
	bool done=false;
	for(int i=0;i<=30;i++)
	{
		if(a[i]!=b[i]&&!done)
			return false;
		if(a[i] == '\n' && b[i]== 'n')
			done =true;
	}
	return true;
}
