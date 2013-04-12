# Written by Christian Mesh

CCFLAGS="-g"

converter: main.cpp triangles.o reads.o utils.o 
	g++ $(CCFLAGS) -o converter triangles.o reads.o utils.o main.cpp
triangles.o: triangles.cpp triangles.h
	g++ $(CCFLAGS) -g -c triangles.cpp
reads.o: reads.cpp reads.h
	g++ $(CCFLAGS) -g -c reads.cpp
utils.o: utils.cpp utils.h
	g++ $(CCFLAGS) -g -c utils.cpp

clean: 
	rm converter *.o
