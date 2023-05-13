import { pad } from './helper'

export const SexoEnum = {
    Masculino: "M",
    Feminino: "F"
}

export const DoseEnum = {
    PrimeiraDose: 1,
    SegundaDose: 2,
    TerceiraDose: 3,
    DoseUnica: 4,
}

export class Vacina {
    id = null
    dataVacinacao = new Date()
    nomeVacina = ""
    dose = DoseEnum.DoseUnica
    comprovante = ""
    proximaVacinacao = new Date()
    constructor(dto) {
        this.dataVacinacao = dto.dataVacinacao;
        this.nomeVacina = dto.nomeVacina;
        this.dose = dto.dose;
        this.comprovante = dto.comprovante;
        this.proximaVacinacao = dto.proximaVacinacao;
        this.id = dto.id;
    }

    get dataVacinacaoFormatada() {
        return `${pad(this.dataVacinacao.getDate())}/${pad(this.dataVacinacao.getMonth() + 1)}/${this.dataVacinacao.getFullYear()}`
    }

    get dataProximaFormatada() {
        if(this.proximaVacinacao) {
            return `${pad(this.proximaVacinacao.getDate())}/${pad(this.proximaVacinacao.getMonth() + 1)}/${this.proximaVacinacao.getFullYear()}`
        } else {
            return "";
        }
    }

    get doseNome() {
        switch (this.dose) {
            case DoseEnum.DoseUnica:
                return "Dose única"
            case DoseEnum.PrimeiraDose:
                return "Primeira dose"
            case DoseEnum.SegundaDose:
                return "Segunda dose"
            case DoseEnum.TerceiraDose:
                return "Terceira dose"
        }
    }
}

export class User {
    id = null
    nome = ""
    sexo = SexoEnum.Masculino
    dataNascimento = new Date()
    email = ""
    senha = ""
    vacinas = []
    constructor(dto) {
        this.id = dto.id;
        this.nome = dto.nome;
        this.sexo = dto.sexo;
        this.dataNascimento = dto.dataNascimento;
        this.email = dto.email;
        this.senha = dto.senha;
        this.vacinas = dto.vacinas ? dto.vacinas : [];
    }
}

export class DataContext {
    constructor() {
        this.createUser(
            {
                nome: "Armando Thomazini",
                sexo: SexoEnum.Masculino,
                dataNascimento: new Date(1999, 0, 14),
                email: "armandothomazini@gmail.com",
                senha: "teste123",
            }
        );
    }
    #vacinaIdCounter = 0;
    #userIdCounter = 0;

    users = [];
    loggedUserId = null;

    createUser(dto = new User()) {
        dto.id = this.generateUserId();
        const newUser = new User(dto)
        this.users.push(newUser);
    }

    createVacina(dto = new Vacina(), userId) {
        dto.id = this.generateVacinaId();
        const vacina = new Vacina(dto)
        const userIndex = this.users.findIndex(user => user.id == userId)
        this.users[userIndex].vacinas.push(vacina)
    }

    editarVacina(dto = new Vacina(), userId, vacinaId) {
        const userIndex = this.users.findIndex(user => user.id == userId);
        const vacinaIndex = this.users[userIndex].vacinas.findIndex(vacina => vacina.id == vacinaId)
        const savedVacina = this.users[userIndex].vacinas[vacinaIndex];
        dto.id = savedVacina.id;
        const newVacina = Object.assign(savedVacina, dto)
        this.users[userIndex].vacinas[vacinaIndex] = newVacina;
    }

    getVacinaById(userId, vacinaId) {
        const userIndex = this.users.findIndex(user => user.id == userId);
        const vacinaIndex = this.users[userIndex].vacinas.findIndex(vacina => vacina.id == vacinaId)
        return this.users[userIndex].vacinas[vacinaIndex];
    }

    excluirVacina(userId, vacinaId) {
        const userIndex = this.users.findIndex(user => user.id == userId);
        const vacinaIndex = this.users[userIndex].vacinas.findIndex(vacina => vacina.id == vacinaId)
        this.users[userIndex].vacinas.splice(vacinaIndex, 1);
    }


    login(email, senha) {
        const foundUser = this.users.find((user) => user.email == email);
        if (foundUser && foundUser.senha == senha) {
            this.loggedUserId = foundUser.id;
            return foundUser;
        }
        return false;
    }

    get loggedUser() {
        return this.users.find((user) => user.id == this.loggedUserId)
    }

    generateUserId() {
        let id = this.#userIdCounter;
        this.#userIdCounter += 1;
        return id;
    }

    generateVacinaId() {
        let id = this.#vacinaIdCounter;
        this.#vacinaIdCounter += 1;
        return id;
    }

    logout() {
        this.loggedUserId = null;
    }
}

export default class ContextManager {
    static instance = ContextManager.instance || new DataContext()
}