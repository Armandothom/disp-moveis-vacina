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
    constructor(dto) {
        this.dataVacinacao = dto.dataVacinacao;
        this.nomeVacina = dto.nomeVacina;
        this.dose = dto.dose;
        this.comprovante = dto.comprovante;
        this.proximaVacinacao = dto.proximaVacinacao;
    }
    dataVacinacao = new Date()
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
                vacinas : [
                    new Vacina({
                        dataVacinacao : new Date(2023, 1, 2),
                        nomeVacina : "Febre Amarela",
                        dose : DoseEnum.DoseUnica,
                        comprovante : "https://vencerocancer.org.br/wp-content/uploads/2018/01/ivoc-seringa-injecao-vacina-Esbenklinker-1000x563.jpg",
                        proximaVacinacao : new Date(2023, 6, 2)
                    }),
                    new Vacina({
                        dataVacinacao : new Date(2023, 2, 15),
                        nomeVacina : "Poliomelite",
                        dose : DoseEnum.SegundaDose,
                        comprovante : "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/02/vacina_astrazeneca_fiocruz-1-1.jpg?w=1200&h=1200&crop=1",
                        proximaVacinacao : new Date(2024, 6, 2)
                    }),
                ]
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

    logout() {
        this.loggedUser = null;
    }
}

export default class ContextManager {
    static instance = ContextManager.instance || new DataContext()
}