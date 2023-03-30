

https://user-images.githubusercontent.com/106928233/228806118-cfb4823b-2c3c-4f49-8df2-511db569ac76.mp4



# GoRest API Kullanarak Kullanıcı Yönetim Sistemi

Bu proje, GoRest API'yi kullanarak bir kullanıcı yönetim sistemi uygulaması oluşturmak için tasarlanmıştır. Uygulama, kullanıcıların listelendiği bir ana sayfa, kullanıcıların ayrıntılarının görüntülendiği bir ayrıntı sayfası ve kullanıcılar için görevlerin listelendiği bir başka ayrıntı sayfası içermektedir.

### Adım-1 : Giriş Ekranı

► PATH: /consumer/login.<br>
► Login ekranı, kullanıcı adı ve token alanlarından oluşur. Kullanıcı adı alanı en az 3 karakter uzunluğunda, token alanı ise en az bir rakam ve en az bir harf içermelidir.<br>
► Kullanıcı adı ve token girilmeden giriş butonu etkisizdir.<br>
► Göster / Gizle ikonu, token alanını gizlemek veya göstermek için kullanılabilir.<br>
► Rastgele bir kullanıcı adı ve yukarıdaki adrese login olarak alınacak token ile sisteme giriş yapılacaktır. Girilen token local-storage'de saklanır.

### Adım-2 : Listeleme Ekranı

► PATH: /public/v2/users<br>
► Method: GET<br>
► Authorization: Bearer Token<br>
► Bootstrap kart yapısı kullanılarak her kullanıcı için bir kart oluşturulacaktır. Her kartta kullanıcının bilgileri yer alır.<br>
► Kullanıcının bilgileri kartın altındaki "Güncelle" butonuna basılarak güncellenebilir.<br>
► Yeni bir kullanıcı eklenebilir. Bu işlem, "Ekle" butonuna basılarak açılacak bir moda yoluyla gerçekleştirilebilir.<br>
► Bir kullanıcı silinebilir. Bu işlem, kartın altındaki "Sil" butonuna basılarak doğrulama moda yoluyal gerçekleştirilebilir.

### Adım-3 : Detay Ekranı

► PATH: /public/v2/users/:id/todos<br>
► Method: GET<br>
► Authorization: Bearer Token<br>
► Kullanıcının kartı üzerinde yer alan "Detay" butonuna basıldığında, kullanıcının görevleri tablo şeklinde listelenecektir.<br>
► Yeni bir görev eklenebilir. Bu işlem, "Ekle" butonuna basılarak açılacak bir moda yoluyla gerçekleştirilebilir.


