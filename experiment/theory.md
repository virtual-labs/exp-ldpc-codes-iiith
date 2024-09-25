# Theory

## LDPC Codes

Recall that a linear code ${\cal C}$ can be described as the set of all vectors which are orthogonal to its parity check matrix $H$, i.e., ${\cal C}=\{\boldsymbol{c}\in {\mathbb F}_2^n: H\boldsymbol{c}^T={\boldsymbol 0}\}$. 

A ***Low-Density Parity Check (LDPC) code*** is one  which has a very sparse parity check matrix, i.e., in which the number of ones is much smaller than the number of zeros. For example, consider the matrix $H$,

$$
\begin{aligned}
H=\begin{bmatrix}
1&1&1&0&0&0&0&0\\
0&0&1&1&0&0&0&0\\
0&1&0&0&1&1&0&0\\
0&0&0&0&0&1&1&1
\end{bmatrix}. 
\end{aligned}
$$
The total number of 1s in the above matrix is $11$ while the number of zeros is $21$. Clearly this is a sparse matrix. Note also that the all rows of the $H$ matrix are linearly independent. We see that $n-k=4$ and $n=8$ for this code, which means that the rate is $\frac{1}{2}$. Further, also observe that the first parity check equation as per $H$ is $c_1+c_2+c_3=0$. We therefore say that the coordinates $c_1,c_2, c_3$ of each codeword are  ***participating*** in the first parity check equation. Similarly, $c_3,c_4$ participate in the second parity check equation, and so on. 

In a more general sense than the example above, the sparse $H$ matrix of an LDPC code may have some linearly redundant rows. Thus, the redundancy of the code can be lower than the number of rows of $H$ (i.e., the dimension of the code can be greater than $n-\text{the number of rows of}~H$). However, throughout our lab here, we will only consider $H$ matrices of codes which have full rank. 

LDPC codes are one of the most widely used codes in practice. Most practical LDPC codes have blocklengths 5000 and above, where each row could have only a few entries which are $1$. Carefully designed LDPC codes have extremely good performance (very low probability of error, and operational rates close to the channel capacity, which is the maximum rate at which a channel with certain noise level can operate) as well as reasonable (though not small) encoding and decoding complexity, which explains their widespread adoption in applications. 


### Regular and Irregular LDPC codes

An LDPC code is called a ***Regular LDPC*** code if the number of 1s in each row of the sparse $H$ matrix is identical (say, equal to $w_r$) and the number of 1s in each column of $H$ is also identical (say, equal to $w_c$). Since the number of rows is $n-k$ and the number of columns is $n$, it should therefore be true that $nw_c=(n-k)w_r$. The ***design rate*** of such a regular LDPC code is defined as $1-\frac{n-k}{n}=1-\frac{w_c}{w_r}$. Note that this corresponds to the actual rate of the code, provided the rows of the $H$ matrix are linearly independent, which is our assumption here. 

A LDPC code is called an ***irregular LDPC code*** if the number of $1$s in the rows (or columns) of the $H$ matrix are not identical. That is, different rows could have different number of 1s, and so can columns, in an irregular code. Observe that, the code with the example $H$ matrix shown above is an irregular LDPC code. Indeed, the second row has only $2$ ones, while the others have $3$ ones each. 

In practice, regular LDPC codes are easier to analyze theoretically, but carefully designed irregular LDPC codes generally have better performance than regular LDPC codes. 

### Tanner graphs of LDPC codes

A graph is a collection of ***vertices*** (drawn as points on a plane, typically) and ***edges*** (drawn as lines or curves between pairs of vertices, typically). A ***bipartite graph*** is a graph whose vertex set can be partitioned into two subsets, such that any edge of the graph exists only between pairs of vertices, exactly one from each subset. Thus, no edge of the bipartite graph exists between pairs of vertices in the same subset of the partition. 

 Any $H$ matrix can be represented using a bipartite graph, called a **Tanner graph**, as follows. Corresponding to the $n$ coordinates in the codeword, we construct $n$ vertices $\{c_1,...,c_n\}$. We call these vertices as the ***variable nodes*** of the Tanner graph. Corresponding to the $n-k$ rows (each one representing one parity equation or parity check equation), we construct $n-k$ ***check nodes***, denoted as $\{z_1,z_2,..,z_{n-k}\}$. A variable node $c_i$ is connected to a check node $z_j$, if and only if the $(j,i)^{th}$ entry of the $H$ matrix is $1$. In other words, if $\{c_i,z_j\}$ is an edge of the Tanner graph, then the $i^{th}$ coordinate $c_i$ participates in the $j^{th}$ parity check equation. 

The figure below shows the Tanner graph of the matrix $H$ given in the example above. 

---
NEED NICELY DRAWN FIGURE OF TANNER GRAPH OF ABOVE MATRIX. 
---

Observe that the degree of each variable node, which is the number of check nodes with which it has an edge, represents the number of parity check equations in which the corresponding coordinate participates in. For instance, the coordinate $c_2$ participates in two check equations in the given example. So, the degree of variable node $c_2$ is precisely two in the graph. Similarly, the degree of each check node is the number of coordinates that participate in the specific parity check equation. For instance, the first check node has degree $3$, as the first parity check equation involves three variables. 

In the upcoming experiments, we will see how the Tanner graph plays a crucial role in visualizing the decoding of LDPC codes on various channels. 