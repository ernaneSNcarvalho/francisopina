import { GoogleSpreadsheet } from 'google-spreadsheet'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet('1wrW-UBpXuZ6UKl5woQXFor7gLXSreI9DG_LYXGYgVZA')

export default async (req, res) => {  
  try {
    await doc.useServiceAccountAuth({
      client_email: 'francis-opina@francis-opina.iam.gserviceaccount.com',
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/ihKYFcfjWz0D\n9La917zRps8nymRpSW04Hub6FZepMApd9mhU360/gdterBZ+zdNr7CCabGoRXfgL\nFJYIaT4UYG4N0MkHKBIbXm7ME/nYmSDcCtH/oqYv0o9S/bNV7gapQwyOZw63Bqd0\nPwsRuyEaQYj/NyyCzaA7mnUfGcyq65aTdz2KnSuDLE/UEHlryj+MzVBqNp1DzVT0\n48qOk5GekHQ5iyUBwdlYBVU3UTtcuvFR0EighaCyabILfCJvEDFkKimCqUpUpT5J\nPGgJ1ipsuuDuUVFILcJm65x4JpdyzBbEKiwjqeZyjhjdfGQIhMVuhg7WNd/jYgxD\n9qb96EGpAgMBAAECggEAC5KkWneQbwKDfoJx6ykGkdVGFXWjWQA0fuxREOGumuyZ\n58D8X0pvfZOTRVZY+prlkBMBiksMIpX+p268PPBc7Z7A74lCqDHJ3Ej5oU+ArE9e\nPqVRuGQjreaHPeCxzfqWgPIZ512/NBxNEFdBzDW2A4/bnu3+vL1/VbKYqoMkzFva\nMTfmgEn7iAR7Ct7iJ0Rjlm+DsjsR0SpZLYvGt38NSbrAtREHDztv58UvDRI2rbtG\nFLmKuvSMgv23LpfmJcOlXJi47xMy0poC9O5srfetofHXIAVpVUrjSEf/iQtCFmcA\nF6H422OYTF1epTCcGfP4sJimjuOSjMSyQbQV7x/ewQKBgQD7VKrISz2w4gWTo4IA\np1zyp0T41fufUARElMbwjz95UtZ/OO7kIrGi+fof1kU79szZlNcJjuL7ZXuFy/se\n6x8orQeQ1asNqrE7fhW7fCaay39taRR26swFNKEgMhOI3BZduaxgVb6cKfTAcKq4\nogkOR7fQwpmsnRQ+3zFbgLw8oQKBgQDDGQloxh82Oq3ug3nEDy0pBuK7MI3vgPzX\n0COO54DpY8o4gl1v77Hk/cHXeU5YZKgB6zDZRttlFXIMfBOHU8pM24coiUwlwhg+\nZ7GiGmxNRjS9P0iQbHah6018xaSwpB6Baq/u6ykRXIREyJs3Bnj1Y7d93jNK5gX5\nVIVxjfYgCQKBgAMjEWaimciFabBoEA1WCXD16YR5l0RryUHZ4YnLH+2xvP+lhEXQ\nsQrpt9eB4ydWc0Qb+XsjD2433AzVePLv2Fm3nyqNoC7xfHjToA3RBOJVu+dvslOx\npo5CE+jE9z10Ectlr+Mb7t8gHu/v+BGJ5DcLah3u7+AZrdEDFCiiOLdBAoGAKecq\nujIzafZYfS4H7TBFRtaPxBy9n39YzxGJUZwvd/FS8aguYWheEQzfoWQQi7Oy0hat\nuz0YyjE8+al8mEhK3w8XjIFQtZtmkaC76lE6ia5WjX8WGs7w+/4J+o6IvNfDJZDA\nkNQ5Ud1JG2zqyXq+aBYuxv3+jkuxZMfekXEoN+ECgYEAxIygso7upyBaidLzGF94\nDwGiCZ2XD+Sv9LV6rpw/NYC5o54TZrN5uVCg+wRcNISCG8XMs3sk68Sxld8Frprg\nYcw0hsEwYJTrIM+WETkS/x2PAt9HbJ/sUD/WyucGBGJcYBhlmg/JqUemV8m9bClx\nxgxCyEAHr2Ziio733lnU7HY=\n-----END PRIVATE KEY-----\n"
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')

    const mostrarPromocaoCell = sheet.getCell(1, 0)
    const textoCell = sheet.getCell(1, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))

  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }

}