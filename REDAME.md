# Cadastro de Carro

**RF**
Deve ser possivel cadastrar um novo carro.

**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado por padrão com disponibilidade true.
O usúario resposavel pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponiveis.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis pelo nome do carro.


**RN**
O usuário nao precisa estar logado no sistema.

# Cadastro de ERspecificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as especificações
Deve ser possivel listar todos os carros.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro nao cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RQN**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usúario resposavel pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel.

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possivel cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possivel cadastrar um aluguel caso já exista um aberto para o mesmo carro.






** Requisitos funcionais - RF
Funcionalidades que a categoria tem

** Requisitos nao Funcionais - RNF
São requisitos que não estao ligados diretamente a regra de negocio - BD Postgress, biblioteca

** Regra de Negócio - RN
