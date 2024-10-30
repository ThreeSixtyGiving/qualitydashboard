<template>
  <section class="collapsed-table">
    <details class="collapsed-table__details">
      <summary>
        <span class="summary-label">All publishers data</span>
        <span class="summary-icon" aria-hidden="true"><img src="@/assets/images/icons/chevron_down.svg" alt="" /></span>
      </summary>
      <div class="collapsed-table--content">
        <div class="table table--zebra table--primary-light">
          <table>
            <template v-for="(section, index) in sections">
              <thead :key="`th-${index}`">
                <th colspan="3">{{ section.heading }}</th>
              </thead>
              <tbody :key="`tb-${index}`">
                <tr>
                  <td v-for="(item, index) in section.items"
                    :key="`data-${index}`"
                    class="table__lead-cell"
                    :data-header="header.th1"
                  >
                    <img :src="`@/assets/images/icons/${item.iconName}.svg`" alt="" />
                    {{ item.label }}: <strong>{{ item.value }}</strong>
                  </td>
                </tr>
              </tbody>
            </template>
          </table>
        </div>
      </div>
    </details>
  </section>
</template>

<script>
export default {
  name: "DataTable",
  data: function() {
    return {
      "header": {
        "th1": "Title",
        "th2": "Description",
        "th3": "Type",
        "th4": "Required"
      },
      "body": [
        {
          "row": {
            "cell1": "Identifier",
            "cell2": "The unique identifier for this grant. Made up of your 360Giving prefix, and an identifier from your records. See the 360Giving Grant identifier guidance for details.",
            "cell3": "string",
            "cell4": true
          }
        },
        {
          "row": {
            "cell1": "Title",
            "cell2": "A title for this grant activity. This should be under 140 characters long.",
            "cell3": "string",
            "cell4": true
          }
        },
        {
          "row": {
            "cell1": "Description",
            "cell2": "A short description of this grant activity.",
            "cell3": "string",
            "cell4": true
          }
        },
        {
          "row": {
            "cell1": "Currency",
            "cell2": "The currency used in amounts. Use the three-letter <a href='#'>currency code from ISO 4217</a> eg: Use GBP for Pounds Sterling.",
            "cell3": "string",
            "cell4": true
          }
        },
        {
          "row": {
            "cell1": "Amount Applied For",
            "cell2": "Total amount applied for in numbers (do not include commas or currency symbols such as £). If you have provided detailed transaction information on a separate table, this should equal the sum of all the application transactions for this grant.",
            "cell3": "number",
            "cell4": false
          }
        },
        {
          "row": {
            "cell1": "Amount Awarded",
            "cell2": "Total amount awarded in numbers (do not include commas or currency symbols such as £). If you have provided detailed transaction information on a separate table, this should equal the sum of all the award transactions for this grant.",
            "cell3": "number",
            "cell4": true
          }
        },
        {
          "row": {
            "cell1": "Amount Disbursed",
            "cell2": "Total amount disbursed (paid) to this grantee when this record was last updated (in numbers: do not include commas or currency symbols such as £)). If you have provided detailed transaction information on a separate table, this should equal the sum of all the disbursement transactions for this grant.",
            "cell3": "number",
            "cell4": false
          }
        },
        {
          "row": {
            "cell1": "Award Date",
            "cell2": "When was the decision to award this grant made. The date should be written as YYYY-MM-DD, or in full date-time format.",
            "cell3": "string",
            "cell4": true
          }
        }
      ],
      "sections": [
        {
          "heading": "Location",
          "items": [
            {
              "icon": {
                "icon_name": "add_location"
              },
              "label": "Include recipient location codes",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "add_location"
              },
              "label": "Include grant location name",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "add_location"
              },
              "label": "Include grant location codes",
              "value": "Unknown"
            }
          ]
        },
        {
          "heading": "Organisation Information",
          "items": [
            {
              "icon": {
                "icon_name": "tag"
              },
              "label": "Include charity or company fields.",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "confirmation_number"
              },
              "label": "Include external org IDs",
              "value": "Unknown"
            }
          ]
        },
        {
          "heading": "Grant Information",
          "items": [
            {
              "icon": {
                "icon_name": "event_note"
              },
              "label": "Include grant duration",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "format_quote"
              },
              "label": "Include programme names",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "label"
              },
              "label": "Include classifications",
              "value": "Unknown"
            }
          ]
        },
        {
          "heading": "Files",
          "items": [
            {
              "icon": {
                "icon_name": "reorder"
              },
              "label": "Include metadata",
              "value": "Unknown"
            },
            {
              "icon": {
                "overlaid_text": "json"
              },
              "label": "Publish using JSON",
              "value": "Unknown"
            },
            {
              "icon": {
                "overlaid_text": "xlsx"
              },
              "label": "Publish using spreadsheets",
              "value": "Unknown"
            }
          ]
        },
        {
          "heading": "Up To Date",
          "items": [
            {
              "icon": {
                "icon_name": "event_available"
              },
              "label": "Published data in the last year",
              "value": "Unknown"
            },
            {
              "icon": {
                "icon_name": "event_available"
              },
              "label": "Published data in the last month",
              "value": "Unknown"
            }
          ]
        }
      ]
    }
  }
}
</script>

