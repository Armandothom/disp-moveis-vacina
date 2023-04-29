import React, { createContext } from 'react';

export const SexoEnum = {
    Masculino : "M",
    Feminino : "F"
}

export const DoseEnum = {
    PrimeiraDose : 1,
    SegundaDose : 2,
    TerceiraDose : 3,
    DoseUnica : 4,
}

export class Vacina {
    dataVacinanao = new Date()
    nomeVacina = ""
    dose = DoseEnum.DoseUnica
    comprovante = ""
    proximaVacinacao = new Date()
}

export class User {
    nome = ""
    sexo = SexoEnum.Masculino
    dataNascimento = new Date()
    email = ""
    senha = ""
    vacinas = []
    constructor(dto) {
        this.nome = dto.nome;
        this.sexo = dto.sexo;
        this.dataNascimento = dto.dataNascimento;
        this.email = dto.email;
        this.senha = dto.senha;
        this.vacinas = [];
    }
}

export class DataContext {
    constructor() {
        this.createUser(
            {
                nome : "Armando Thomazini",
                sexo: SexoEnum.Masculino,
                dataNascimento : new Date(1999, 0, 14),
                email : "armandothomazini@gmail.com",
                senha : "teste123",
                vacinas : []
            }
        );
    }

    users = [];
    loggedUser = null;

    createUser(dtoUser = new User()) {
        const newUser = new User(dtoUser)
        this.users.push(newUser);
    }

    login(email, senha) {
        const foundUser = this.users.find((user) => user.email == email);
        if(foundUser && foundUser.senha == senha) {
            this.loggedUser = foundUser;
            return foundUser;
        }
        return false;
    }
}

const dataContext = createContext(new DataContext());

export default dataContext;