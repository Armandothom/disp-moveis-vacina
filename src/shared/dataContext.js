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
    dataVacinacao = 0
    nomeVacina = ""
    dose = DoseEnum.DoseUnica
    comprovante = ""
    proximaVacinacao = 0
    constructor(dto) {
        this.dataVacinacao = dto.dataVacinacao
        this.nomeVacina = dto.nomeVacina;
        this.dose = dto.dose;
        this.comprovante = dto.comprovante;
        this.proximaVacinacao = dto.proximaVacinacao
        this.id = dto.id;
    }

    get dataVacinacaoFormatada() {
        console.log("get dataVacinacaoFormatada")
        console.log(this)
        const data = new Date(this.dataVacinacao)
        return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()}`
    }

    get dataProximaFormatada() {
        if(this.proximaVacinacao) {
            const data = new Date(this.proximaVacinacao)
            return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()}`
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
    dataNascimento = 0
    email = ""
    senha = ""
    constructor(dto) {
        this.id = dto.id;
        this.nome = dto.nome;
        this.sexo = dto.sexo;
        this.dataNascimento = dto.dataNascimento;
        this.email = dto.email;
        this.senha = dto.senha;
    }
}

export class DataContext {
    loggedUser = null;
    constructor() {
    }


    setUserLoggedId(dto) {
        this.loggedUser = new User(dto)
        this.loggedUser.dataNascimento = new Date(this.loggedUser.dataNascimento)
    }

    getVacinaPath() {
        if(!this.loggedUser) throw new Error("Nenhum user logado");
        return `usuarios/${this.loggedUser.id}/vacinas`
    }

    logout() {
        this.loggedUser = null;
    }
}

export default class ContextManager {
    static instance = ContextManager.instance || new DataContext()
}