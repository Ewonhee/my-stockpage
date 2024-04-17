
export default function register() {
    return (
      <div className='register_container'>
        <h2>회원가입</h2>
        <form method="POST" action="/api/auth/signup" >
          <input name="name" type="text" placeholder="이름" /> 
          <input name="email" type="text" placeholder="이메일"  />
          <input name="password" type="password" placeholder="비밀번호"  />
          <button type="submit">가입하기</button>
        </form>
      </div>
    );
  }
  
  