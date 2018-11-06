export default{
    restApiUrl: serverConnection('L')
};

function serverConnection(type: 'L' | 'P' | 'T') {
    switch (type) {
        case 'L': return 'http://localhost:3000'; // local
        case 'P': return 'http://10.60.64.72:80'; // production
        case 'T': return 'http://10.60.64.72:8080'; // test
    }
}