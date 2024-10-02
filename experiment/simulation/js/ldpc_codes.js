const NonSparseH = [
    [
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 1]
    ],
    [
        [1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1]
    ],
    [0]

];

const SparseRegularH = [
    [
        [1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 0, 1, 1, 1, 0]
    ],
    [
        [1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0 ,0],
        [0, 0, 0, 0, 1, 0, 1 ,0],
        [0, 0, 0, 0, 0, 1, 0 ,1]
    ],
    [
        [1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 1, 0]
    ],
    [
        [1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0]
    ],
    [
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1]
    ],
    [1]

];

const SparseIrregularH = [
    [
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 0, 0, 0, 1]
    ],
    [
        [1, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1]
    ],
    [
        [1, 1, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0]
    ],
    [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0]
    ],
    [
        [1, 1, 1, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1]
    ],
    [2]

];

function matrixToLatex(matrix) {
    let latexMatrix = '\\begin{bmatrix}';
    
    matrix.forEach((row, rowIndex) => {
        latexMatrix += row.join(' & ');  // Join elements with &
        if (rowIndex < matrix.length - 1) {
            latexMatrix += ' \\\\ ';  // Add newline for LaTeX
        }
    });

    // MathJax.typeset();
    // MathJax.typesetPromise();

    latexMatrix += '\\end{bmatrix}';
    return latexMatrix;
}

function chooserandommatrix(){
    const sparsity = Math.floor(Math.random() * 3);
    const randommatrix = Math.floor(Math.random() * 5);

    let sparsematrix;
    let code;

    if(sparsity === 0){
        sparsematrix = NonSparseH[randommatrix];
        code = NonSparseH[5];
    }
    else if(sparsity === 1){
        sparsematrix = SparseRegularH[randommatrix];
        code = SparseRegularH[5];
    }
    else{
        sparsematrix = SparseIrregularH[randommatrix];
        code = SparseIrregularH[5];
    }

    
    return [sparsematrix, code];
}

[spmatrix, code] = chooserandommatrix();

window.onload = function(){
    const paritycheckmatrix = document.getElementById("pcmatrix");
    const latex = matrixToLatex(spmatrix);

    paritycheckmatrix.innerHTML = `\\[ ${latex} \\]`;

    MathJax.typesetPromise();
}

window.onload = function(){
    const paritycheckmatrix = document.getElementById("pcmatrix");
    const latex = matrixToLatex(spmatrix);

    paritycheckmatrix.innerHTML = `\\[ ${latex} \\]`;

    MathJax.typesetPromise();
}

function matrixcheck(){
    const option1 = document.getElementById('answera').checked;
    const option2 = document.getElementById('answerb').checked;
    const option3 = document.getElementById('answerc').checked;

    const obsa = document.getElementById('observationsa');

    console.log(code);
    console.log(option1);
    console.log(option2);
    console.log(option3);

    if(option1 === true && option2 === false && option3 === false && code[0] == 0){
        obsa.innerHTML = "Correct! In this parity check matrix, the number of ones is much larger than the number of zeros hence it is non-sparse.";
        obsa.style.color = "green";
    }
    else if(option1 === false && option2 === true && option3 === false && code[0] == 2){
        obsa.innerHTML = "Correct! In this parity check matrix, the number of ones is much smaller than the number of zeros hence it is sparse and each row and column does not have the same number of ones hence it is irregular.";
        obsa.style.color = "green";
    }
    else if(option1 === false && option2 === false && option3 === true && code[0] == 1){
        obsa.innerHTML = "Correct! In this parity check matrix, the number of ones is much smaller than the number of zeros hence it is sparse and each row and column has the same number of ones hence it is regular.";
        obsa.style.color = "green";
    }
    else{
        obsa.innerHTML = "Wrong! Kindly go through the theory and try again!";
        obsa.style.color = "red";
    }
}

function isLDPCcode(c){

    const obsb = document.getElementById('observationsb');
    const nextbutton = document.getElementById('nextButton');

    if(c == 0 && (code[0] == 1 || code[0] == 2)){
        obsb.innerHTML = "Wrong! The given parity check matrix does define a LDPC code. Kindly check the instructions and try again.";
        obsb.style.color = "red";
    }
    else if(c == 1 && code[0] == 0){
        obsb.innerHTML = "Wrong! The given parity check matrix does not define a LDPC code since it is a non-sparse matrix. Kindly check the instructions and try again.";
        obsb.style.color = "red";
    }
    else if(c == 1 && (code[0] == 1 || code[0] == 2)){
        obsb.innerHTML = "Correct! The given parity check matrix does indeed define a LDPC code. You can proceed to next sub-experiment";
        obsb.style.color = "green";
        nextbutton.style.display = "block";
    }
    else{
        obsb.innerHTML = "Correct! The given parity check matrix does not define a LDPC code since it is a non-sparse matrix.<br> Since the given parity check matrix did not define a LDPC code, try again with another parity check matrix.";
        obsb.style.color = "green";
        reloadPage();
        document.getElementById('observationsb').innerHTML = "Correct! Since the above matrix did not define a LDPC code. Try again with another matrix.";
        
    }
}

window.onload = function() {
    // Check if there is any saved content in localStorage
    const savedContent = localStorage.getItem('obs');
    if (savedContent) {
        document.getElementById('observationsb').innerHTML = savedContent;
    }

};

function reloadPage() {
    // Get the current innerHTML of the element you want to preserve
    const content = document.getElementById('observationsb').innerHTML;
    
    // Save the current innerHTML to localStorage
    localStorage.setItem('obs', content);
    
    // Reload the page
    location.reload();
}

function nextLDPCquestion(){    

    document.getElementById('rateques').style.display = "block";
    document.getElementById('ldpcq1').style.display = "none";
    document.getElementById('observationsa').innerHTML = '';
    document.getElementById('observationsb').innerHTML = '';

}

function checkRatequestion(){

    const num = document.getElementById("numerator").value;
    const denom = document.getElementById("denominator").value;

    const obsa1 = document.getElementById('observationsa');

    const m = spmatrix.length;
    const n = spmatrix[0].length;

    const rate = 1 - (m/n);

    if(num != (n-m)){
        obsa1.innerHTML = "Kindly check the numerator again by going through the instructions."
        obsa1.style.color = "red";
    }
    else if(denom != n){
        obsa1.innerHTML = "Kindly check the denominator again by going through the instructions."
        obsa1.style.color = "red";
    }
    else{
        obsa1.innerHTML = "The entered rate is correct!";
        obsa1.style.color = "green";
    }

    console.log(num);
    console.log(denom);
    console.log(n-m);
    console.log(n);

}