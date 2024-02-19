fn main() {
    let b: Box<i32> = Box::new(5);
}
fn first_word(s: &String) -> &str {
    &s[..1]
}
