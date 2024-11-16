import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleLogin, SubtitleLogin,EsqueciText, CriarText, Row, Wrapper, CriarText2, CriarText3  } from './styles';

const Cadastro = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            // Enviar os dados para a API de criação de usuários
            const { data } = await api.post('/users', {
                email: formData.email,
                senha: formData.senha,
                nome: formData.nome,
            });

            if (data.id) {
                alert('Cadastro realizado com sucesso!');
                navigate('/login'); // Redirecionar para a tela de login
            }
        } catch (e) {
            alert('Erro ao cadastrar usuário. Tente novamente!');
        }
    };

    console.log('errors', errors);

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Crie sua conta</TitleLogin>
                        <SubtitleLogin>Preencha os dados abaixo e make the change_</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome" leftIcon={<MdPerson />} name="nome" control={control} />
                            {errors.nome && <span>Nome é obrigatório</span>}

                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}

                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatória</span>}

                            <Button title="Cadastrar" variant="secondary" type="submit" />
                        </form>
                        <CriarText3>Ao clicar em "Criar minha conta grátis", declaro que aceito as políticas de privacidade e os termos de Uso da DIO.</CriarText3>
                        <Row>
                            <CriarText2>já tenho conta.  </CriarText2>
                            <CriarText onClick={() => navigate('/login')}>Faça login</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
}

export { Cadastro };
