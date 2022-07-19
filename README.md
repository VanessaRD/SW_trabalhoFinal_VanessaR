# **Trabalho Final de Serviços Web**
#### Instituição: Instituto Federal Sul-Rio-Grandense - Câmpus Passo Fundo
##### Curso: Ciência da Computação
##### Aluna: Vanessa Rossi Debarba
##### Atividade: Desenvolver uma API baseada na arquitetura Micro Serviços.

Desenvolver uma API baseada na arquitetura de Micro Serviços. A API deve ter um serviço principal que será uma API GATEWAY, que deve se conectar a outros dois serviços. Os dois serviços aos quais a API principal irá se conectar devem executar operações CRUD sobre tabelas de um banco de dados, e devem funcionar de forma
independente. 
A segurança com JWT deve ser implementada no serviço principal, controlando o acesso a todas as rotas disponíveis. O usuário e senha a serem utilizados na autenticação devem estar armazenados em um banco de dados. O acesso do cliente deve ser realizado somente na API GATEWAY. As API devem ser disponibilizadas em algum serviço de hospedagem em nuvem, de
escolha do aluno.