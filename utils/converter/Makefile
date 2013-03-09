# Written by Christian Mesh

converter: main.cpp triangles.o reads.o utils.o 
	g++ -o converter triangles.o reads.o utils.o main.cpp
triangles.o: triangles.cpp triangles.h
	g++ -g -c triangles.cpp
reads.o: reads.cpp reads.h
	g++ -g -c reads.cpp
utils.o: utils.cpp utils.h
	g++ -g -c utils.cpp

clean: 
	rm converter *.o
