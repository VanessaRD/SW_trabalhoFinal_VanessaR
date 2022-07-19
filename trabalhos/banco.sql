-- Criar um banco de dados chamado trabalhos_api	

-- Criar a tabela trabalhos

create table trabalhos (
codigo serial not null primary key, 
nome varchar(50) not null,
preco decimal(10,2) not null,
descricao varchar(150) not null,
porte varchar(50) not null);

-- inserir alguns registros
insert into trabalhos (nome, preco, descricao, porte) values 
('Banho', 55.5, 'Lavar o animal, secar e passar perfume.', 'Pequeno'), 
('Tosa curta', 65.0, 'Tosar todo o pelo do animal bem curto', 'Grande');